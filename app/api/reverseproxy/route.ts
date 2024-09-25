import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Obtém o corpo da requisição como JSON

    const response = await fetch('http://35.199.77.49:9090/api/v1/auth/login', {
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