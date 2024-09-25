// app/api/reverseproxy/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { port } = Object.fromEntries(req.url.split('?')[1].split('&').map(param => param.split('=')));

  let targetUrl = '';
  if (port === '9090') {
    targetUrl = 'http://35.199.77.49:9090/api/v1/auth/login';
  } else if (port === '8081') {
    targetUrl = 'http://35.199.77.49:8081/api/v1/auth/login'; // Ajuste conforme necessário
  } else {
    return NextResponse.json({ message: 'Porta não suportada.' }, { status: 400 });
  }

  try {
    const body = await req.json(); // Captura o corpo da requisição
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json({ message: 'Erro ao conectar com a API.' }, { status: 500 });
  }
}
