import { createClient } from '@supabase/supabase-js';

const supabaseUrlRaw =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : 'https://placeholder.supabase.co';

const supabaseUrl = supabaseUrlRaw.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.startsWith('eyJ') ||
   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.startsWith('sb_'))
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PortfolioItem = {
  id: string;
  titulo: string;
  cliente: string | null;
  categoria: string;
  nicho: string | null;
  descricao: string | null;
  imagem_url: string;
  galeria: string[] | null;
  tipo_imagem: 'upload' | 'link';
  publicado: boolean;
  ordem: number;
  criado_em: string;
  material: string | null;
  coords: string | null;
};
