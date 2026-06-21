import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hashPassword, verifyPassword } from '@/lib/crypto';
import { verifySessionToken, COOKIE_NAME } from '@/lib/session';
import crypto from 'crypto';

const supabaseUrlRaw = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = supabaseUrlRaw.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'
);

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const sessionOk = await verifySessionToken(token);
  if (!sessionOk) {
    return NextResponse.json({ ok: false, message: 'Não autorizado.' }, { status: 401 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

  // Rate-limit: máx 5 tentativas em 15 minutos por IP
  const windowStart = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count } = await supabaseAdmin
    .from('login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gt('created_at', windowStart);

  if ((count ?? 0) >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { ok: false, message: 'Muitas tentativas. Aguarde 15 minutos.' },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const { senhaAtual, novaSenha } = body;

  if (!senhaAtual || !novaSenha || typeof senhaAtual !== 'string' || typeof novaSenha !== 'string') {
    return NextResponse.json({ ok: false, message: 'Dados inválidos.' }, { status: 400 });
  }

  if (novaSenha.length < 12) {
    return NextResponse.json({ ok: false, message: 'A nova senha deve ter pelo menos 12 caracteres.' }, { status: 400 });
  }
  if (!/[A-Z]/.test(novaSenha)) {
    return NextResponse.json({ ok: false, message: 'A senha deve conter pelo menos uma letra maiúscula.' }, { status: 400 });
  }
  if (!/[0-9]/.test(novaSenha)) {
    return NextResponse.json({ ok: false, message: 'A senha deve conter pelo menos um número.' }, { status: 400 });
  }
  if (!/[@$!%*?&\-_#^]/.test(novaSenha)) {
    return NextResponse.json({ ok: false, message: 'A senha deve conter pelo menos um caractere especial (@$!%*?&...).' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('admin_settings')
    .select('password_hash, password_salt')
    .eq('id', 'singleton')
    .single();

  if (error || !data) {
    return NextResponse.json({ ok: false, message: 'Configuração não encontrada.' }, { status: 500 });
  }

  const valida = await verifyPassword(senhaAtual, data.password_salt, data.password_hash);
  if (!valida) {
    // Registra tentativa falha contra força bruta
    await supabaseAdmin.from('login_attempts').insert({ ip_hash: ipHash });
    return NextResponse.json({ ok: false, message: 'Senha atual incorreta.' }, { status: 401 });
  }

  const hash = await hashPassword(novaSenha);
  const { error: updateError } = await supabaseAdmin
    .from('admin_settings')
    .upsert({ id: 'singleton', password_hash: hash, password_salt: '', updated_at: new Date().toISOString() });

  if (updateError) {
    return NextResponse.json({ ok: false, message: 'Erro ao salvar. Tente novamente.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
