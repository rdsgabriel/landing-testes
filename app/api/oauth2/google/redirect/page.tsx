'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


const RedirectPage = () => {
  const router = useRouter();


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      // Armazenando o token em um cookie
      Cookies.set('token', token, { expires: 7, path: '/' });
      // Redirecionando para a página workspace
      router.push('/workspace');
    } else if (error) {

      router.push('/login'); // Ou onde você quiser redirecionar em caso de erro
    }
  }, [router ]);

  return null; // Não precisamos renderizar nada neste componente
};