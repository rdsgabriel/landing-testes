'use client'
import { useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';

const Jwt = () => {
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Token não encontrado.');
      return;
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        setError('Token inválido.');
        return;
      }

      setDecodedToken(decoded as JwtPayload);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido.');
      }
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {decodedToken ? (
        <div>
          <h2>Você já tá logado, <span className='text-purple-700 font-bold'>{decodedToken.name}</span></h2>
        </div>
      ) : (
        <div>Nenhum token disponível.</div>
      )}
    </div>
  );
};

export default Jwt;
