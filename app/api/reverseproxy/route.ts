// app/api/reverseproxy/route.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('http://35.199.77.49:9090/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body), // Passa o corpo da requisição
      });

      const text = await response.text(); // Capture a resposta como texto

      let data;
      try {
        data = JSON.parse(text); // Tente analisar o texto como JSON
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
