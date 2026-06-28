import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, COOKIE_NAME } from '@/lib/session';

export async function proxy(req: NextRequest) {
  // Se for a página inicial do site público, desloga automaticamente o admin apagando o cookie
  if (req.nextUrl.pathname === '/') {
    const res = NextResponse.next();
    if (req.cookies.has(COOKIE_NAME)) {
      res.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
    }
    return res;
  }

  // Se for qualquer rota dentro de /admin, exceto a tela de login
  if (req.nextUrl.pathname === '/admin' || (req.nextUrl.pathname.startsWith('/admin/') && !req.nextUrl.pathname.startsWith('/admin/login'))) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const valid = await verifySessionToken(token);
    if (!valid) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin', '/admin/:path*'],
};
