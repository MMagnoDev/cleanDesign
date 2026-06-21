import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifySessionToken, COOKIE_NAME } from '@/lib/session';

export const dynamic = 'force-dynamic';

const supabaseUrlRaw = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = supabaseUrlRaw.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'
);

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

// GET - Retorna todos os itens do portfólio (ordem crescente)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('portfolio')
    .select('*')
    .order('ordem', { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, items: data });
}

// POST - Insere um novo item ou faz upload de imagem
export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ ok: false, message: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      if (!file) {
        return NextResponse.json({ ok: false, message: 'Arquivo não enviado.' }, { status: 400 });
      }

      const ext = file.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { data: upData, error: upError } = await supabaseAdmin.storage
        .from('portfolio-images')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: true
        });

      if (upError) {
        return NextResponse.json({ ok: false, message: 'Erro no storage: ' + upError.message }, { status: 500 });
      }

      const { data: urlData } = supabaseAdmin.storage.from('portfolio-images').getPublicUrl(upData.path);
      return NextResponse.json({ ok: true, publicUrl: urlData.publicUrl });
    }

    const body = await req.json();
    const { error } = await supabaseAdmin.from('portfolio').insert(body);
    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const e = err as Error;
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 });
  }
}

// PUT - Atualiza um item
export async function PUT(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ ok: false, message: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...payload } = body;
    if (!id) {
      return NextResponse.json({ ok: false, message: 'ID do item é obrigatório.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('portfolio').update(payload).eq('id', id);
    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const e = err as Error;
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 });
  }
}

// DELETE - Remove um item
export async function DELETE(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ ok: false, message: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ ok: false, message: 'ID do item é obrigatório.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('portfolio').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const e = err as Error;
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 });
  }
}
