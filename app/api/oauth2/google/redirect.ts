import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (typeof token === 'string') {
    // Redireciona para a página de redirecionamento com o token na query string
    return NextResponse.redirect('/oauth2/google/redirect?token=${token}');
  }

  return res.status(400).json({ message: 'Token não encontrado' });
}
