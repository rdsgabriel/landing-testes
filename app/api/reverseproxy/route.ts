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

    const text = await response.text(); // Capture a resposta como texto
    console.log('Response Text:', text); // Log da resposta

    let data;
    try {
      data = JSON.parse(text); // Tente analisar o texto como JSON
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return NextResponse.json({ message: 'Erro ao processar a resposta da API.' }, { status: 500 });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json({ message: 'Erro ao conectar com a API.' }, { status: 500 });
  }
}
