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
          <h2>JWT Decodificado:</h2>
          <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
        </div>
      ) : (
        <div>Nenhum token disponível.</div>
      )}
    </div>
  );
};

export default Jwt;
