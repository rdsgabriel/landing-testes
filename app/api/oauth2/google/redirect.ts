import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (typeof token === 'string') {
    // Redireciona para a página de redirecionamento com o token na query string
    res.redirect(302, `/workspace?token=${token}`);
  } else {
    res.status(400).json({ message: 'Token não encontrado' });
  }
}