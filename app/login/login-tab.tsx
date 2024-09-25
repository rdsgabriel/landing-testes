'use client'
import React, { FormEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  username: string;
  password: string;
  // Inserior SSO
}

export default function LoginPage(): JSX.Element {

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  })

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({...formData, [e.target.id]: value});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const response = await fetch('http://35.199.77.49:9090/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
  
      if (response.status === 401) {
        setError('Usuário ou senha inválidos, tente novamente.');
        return;
      }
  
      if (response.status === 400) {
        const data = await response.json();
        setError(data.message || 'Dados inválidos.');
        return;
      }
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao fazer login');
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.jwt); // Trocar pra Cookie
      setSuccess('Login realizado com sucesso!');
      console.log('data:', data)
      console.log('jwt token:', data.jwt);
      console.log('refreshToken:', data.refreshToken)
      router.push('/workspace');
  
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao conectar com o servidor');
      } else {
        setError('Erro desconhecido.');
      }
    }
  };
  
  
  

  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="p-6 px-8 sm:p-6">
        <Link href='/'>
        <h1 className="text-2xl font-bold text-gray-800"><span className='text-purple-600'>Task</span>Freela</h1>
        </Link>

      </header>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(128, 90, 213, 0.08)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <main className="flex-grow flex items-center justify-center p-8 sm:p-6">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="space-y-2">
            <h2 className="text-[32px] font-bold text-gray-500 leading-tight">Seja bem-vindo(a) ao <br className='hidden md:block' /> <span className='text-purple-600'>Task</span><span className='text-gray-800'>Freela.</span></h2>
            <p className="text-[14px] text-gray-500">Entre na sua conta para continuar</p>
          </div>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-200">
              <TabsTrigger 
                value="email" 
                className="font-semibold text-gray-500 data-[state=active]:text-purple-600 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Email
              </TabsTrigger>
              <TabsTrigger 
                value="sso" 
                className="font-semibold text-gray-500 data-[state=active]:text-purple-600 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                SSO
              </TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="username" className="block text-sm font-bold text-gray-500">Email</Label>
                  <Input
                    id="username"
                    type="email"
                    placeholder="Entre com seu email"
                    className="mt-1 text-black"
                    value={formData.username}
                    onChange={handleChange}
                    required/>
                </div>

                <div>
                  <Label htmlFor="password" className="block text-sm font-bold text-gray-500">Senha</Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="Entre com sua senha"
                    className="mt-1 text-black"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <div className="flex items-center">
                  <Checkbox id="remember" className="h-4 w-4 text-purple-600 focus:ring-blue-500 border-gray-300 rounded data-[state=checked]:bg-purple-600" />
                  <Label htmlFor="remember" className="ml-2 block text-sm text-gray-600 font-bold">Lembrar-me</Label>
                </div>

                
                <Button type='submit' className=" mt-4 w-full font-medium bg-purple-100 hover:bg-purple-600 hover:text-white text-purple-600 border-purple-600 border">
                  Entrar
                </Button>
      
              </form>
            </TabsContent>
            <TabsContent value="sso">
              <div className="space-y-3">
                <Label htmlFor="sso-email" className="block text-sm font-bold text-gray-600">Email empresarial</Label>
                <Input id="sso-email" type="email" placeholder="nome@empresa.com" />
                <p className="text-sm text-gray-500">Use um email de uma corporação para colaborar facilmente com seus colegas de trabalho.</p>
                <Button className="w-full font-medium bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-600 border-purple-600 border">
                  Continuar com SSO
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-100 text-gray-500">OU CONTINUE COM</span>
            </div>
          </div>
          <Button variant="outline" className="w-full border border-gray-300 font-bold text-gray-700 hover:bg-gray-50">
            <FaGoogle className="mr-2 text-purple-600" />
            Google
          </Button>
          <div className="text-center">
            <Link href="/recovery" className="text-sm text-gray-600 hover:text-purple-600">Esqueceu sua senha?</Link>
          </div>
          <div className="text-center text-sm text-gray-600">
            Não tem uma conta ainda?{' '}
            <Link href="/register" className=" text-purple-600 hover:text-purple-800 font-bold">Registrar</Link>
          </div>
        </div>
      </main>
    </div>
  )
}