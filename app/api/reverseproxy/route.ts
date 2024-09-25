import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const url = new URL(req.url);
  const port = url.searchParams.get('port');
  const action = url.searchParams.get('action'); // Adicionei um parâmetro de ação

  let targetUrl = '';

  // Defina as URLs de acordo com a ação
  if (port === '9090') {
    targetUrl = action === 'signup'
      ? 'http://35.199.77.49:9090/api/v1/auth/signup'
      : 'http://35.199.77.49:9090/api/v1/auth/login';
  } else if (port === '8081') {
    targetUrl = action === 'register'
      ? 'http://35.199.77.49:8081/api/v1/auth/signup'
      : 'http://35.199.77.49:8081/api/v1/auth/login';
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

    const text = await response.text();
    console.log('Response Text:', text);

    if (!response.ok) {
      return NextResponse.json({ message: 'Erro na API externa.', details: text }, { status: response.status });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return NextResponse.json({ message: 'Erro ao processar a resposta da API.', details: text }, { status: 500 });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json({ message: 'Erro ao conectar com a API.', status: 500 });
  }
}
