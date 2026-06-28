import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyPassword } from '@/lib/crypto';
import { createSessionToken, COOKIE_NAME } from '@/lib/session';
import crypto from 'crypto';

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

function getSupabaseAdmin() {
  const supabaseUrlRaw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrlRaw) throw new Error('NEXT_PUBLIC_SUPABASE_URL não configurado');
  const supabaseUrl = supabaseUrlRaw.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseServiceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY não configurado');

  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(req: NextRequest) {
  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (e) {
    console.error('[login] Env var missing:', e);
    return NextResponse.json({ ok: false, message: 'Erro de configuração do servidor.' }, { status: 500 });
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
  const { senha } = body;

  if (!senha || typeof senha !== 'string') {
    return NextResponse.json({ ok: false, message: 'Senha inválida.' }, { status: 400 });
  }

  // Busca hash da senha
  const { data, error } = await supabaseAdmin
    .from('admin_settings')
    .select('password_hash, password_salt')
    .eq('id', 'singleton')
    .single();

  if (error || !data) {
    return NextResponse.json({ ok: false, message: 'Configuração não encontrada.' }, { status: 500 });
  }

  const valida = await verifyPassword(senha, data.password_salt, data.password_hash);

  if (!valida) {
    // Registra tentativa falha
    await supabaseAdmin.from('login_attempts').insert({ ip_hash: ipHash });
    return NextResponse.json({ ok: false, message: 'Senha incorreta.' }, { status: 401 });
  }

  // Cria token de sessão e configura cookie HttpOnly
  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 8 * 60 * 60, // 8 horas em segundos
    path: '/',
  });
  return res;
}
