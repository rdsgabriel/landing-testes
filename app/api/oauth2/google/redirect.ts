// src/app/api/oauth2/google/redirect.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'js-cookie';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (typeof token === 'string') {
    Cookies.set('token', token, { expires: 7, path: '/' });
    return res.redirect('/workspace');
  }

  res.status(400).json({ message: 'Token não encontrado' });
}

