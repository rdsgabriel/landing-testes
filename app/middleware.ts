import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = localStorage.getItem('token'); // Ou localStorage, dependendo da sua implementação

  if (!token) {
    // Redireciona para a página de login se não houver token
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Continua para a rota se o token existir
}

// Protege a rota /workspace e todas suas subrotas
export const config = {
  matcher: ['/workspace/:path*'], // Protege a rota /workspace e subrotas
};
