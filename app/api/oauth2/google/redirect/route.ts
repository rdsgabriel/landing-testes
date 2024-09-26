import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=Token não encontrado', request.url))
  }

  // Redireciona para a página de callback com o token como parâmetro de consulta
  return NextResponse.redirect(new URL(`/auth/callback?token=${encodeURIComponent(token)}`, request.url))
}