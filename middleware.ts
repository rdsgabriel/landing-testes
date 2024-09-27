import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  
  // Se o usuário tentar acessar a rota /login e já tiver um token, redireciona para /workspace
  if (req.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/workspace', req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith('/workspace')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }


  return NextResponse.next();
}
export const config = {
  matcher: ['/workspace/:path*', '/login'],
};