import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrlRaw = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = supabaseUrlRaw.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'
);

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('portfolio')
    .select('*')
    .eq('publicado', true)
    .order('ordem', { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, items: data });
}
