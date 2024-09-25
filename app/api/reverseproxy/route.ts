// app/api/reverseproxy/route.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const port = req.query.port; // Espera que a porta venha na query

  let targetUrl = '';
  if (port === '9090') {
    targetUrl = 'http://35.199.77.49:9090/api/v1/auth/login';
  } else if (port === '8081') {
    targetUrl = 'http://35.199.77.49:8081/api/v1/auth/login'; // Ajuste a URL conforme necessário
  } else {
    return res.status(400).json({ message: 'Porta não suportada.' });
  }

  if (req.method === 'POST') {
    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return res.status(500).json({ message: 'Erro ao processar a resposta da API.' });
      }

      res.status(response.status).json(data);
    } catch (error) {
      console.error('Connection error:', error);
      res.status(500).json({ message: 'Erro ao conectar com a API.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
