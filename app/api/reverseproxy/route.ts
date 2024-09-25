// app/api/reverseproxy/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { port, action } = Object.fromEntries(req.url.split('?')[1].split('&').map(param => param.split('=')));

  let targetUrl = '';
  if (port === '9090') {
    if (action === 'login') {
      targetUrl = 'http://35.199.77.49:9090/api/v1/auth/login';
    } else if (action === 'register') {
      targetUrl = 'http://35.199.77.49:9090/api/v1/auth/signup'; // URL para registro
    }
  } else if (port === '8081') {
    if (action === 'login') {
      targetUrl = 'http://35.199.77.49:8081/api/v1/auth/login';
    } else if (action === 'register') {
      targetUrl = 'http://35.199.77.49:8081/api/v1/auth/signup'; // URL para registro
    }
  } else {
    return NextResponse.json({ message: 'Porta não suportada.' }, { status: 400 });
  }
  try {
    const body = await req.json();
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await response.text(); // Captura a resposta como texto
    console.log('Response Text:', text); // Log da resposta

    // Verifica se a resposta está OK
    if (!response.ok) {
      return NextResponse.json({ message: 'Erro na API externa.', details: text }, { status: response.status });
    }

    let data;
    try {
      data = JSON.parse(text); // Tente analisar o texto como JSON
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return NextResponse.json({ message: 'Erro ao processar a resposta da API.', details: text }, { status: 500 });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json({ message: 'Erro ao conectar com a API.' }, { status: 500 });
  }
}
