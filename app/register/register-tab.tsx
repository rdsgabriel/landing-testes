'use client'
import React, { useState, FormEvent, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link'

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  terms: boolean;
}

export default function RegisterPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    terms: false
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.id]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, terms: checked });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.passwordConfirm) {
      setError('As senhas não coincidem');
      return;
    }

    if (!formData.terms) {
      setError('Você deve concordar com os Termos de Serviço e Política de Privacidade');
      return;
    }

    try {
      const response = await fetch('http://35.199.77.49:9090/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setSuccess('Conta criada com sucesso!');
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao criar conta');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    }
  };

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
            <h2 className="text-[32px] font-bold text-gray-500 leading-tight">Crie sua conta no <br className='hidden md:block' /> <span className='text-purple-600'>Task</span><span className='text-gray-800'>Freela.</span></h2>
            <p className="text-[14px] text-gray-500">Falta pouco para começar a gerenciar seus projetos de forma eficiente.</p>
          </div>
         
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-bold text-gray-500">Nome completo</Label>
              <Input id="name" type="text" placeholder="Seu nome completo" className="mt-1 text-black" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-bold text-gray-500">Email</Label>
              <Input id="email" type="email" placeholder="Seu melhor email" className="mt-1 text-black" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-bold text-gray-500">Senha</Label>
              <Input id="password" type="password" placeholder="Crie uma senha forte" className="mt-1 text-black" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="passwordConfirm" className="block text-sm font-bold text-gray-500">Confirme sua senha</Label>
              <Input id="passwordConfirm" type="password" placeholder="Repita sua senha" className="mt-1 text-black" value={formData.passwordConfirm} onChange={handleChange} required />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <div className="flex items-center">
              <Checkbox id="terms" className="h-4 w-4 text-purple-600 focus:ring-blue-500 border-gray-300 rounded data-[state=checked]:bg-purple-600" checked={formData.terms} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="terms" className="ml-2 block text-sm text-gray-500 mt-1">
                Eu concordo com os <a href="#" className="text-purple-600 hover:text-blue-800">Termos de Serviço</a> e <a href="#" className="text-purple-600 hover:text-blue-800">Política de Privacidade</a>
              </Label>
            </div>
            <Button type="submit" className="w-full font-medium bg-purple-100 hover:bg-purple-600 hover:text-white text-purple-600 border-purple-600 border">
              Criar conta
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-100 text-gray-500">OU REGISTRE-SE COM</span>
            </div>
          </div>
          <Button variant="outline" className="w-full border border-gray-300 font-bold text-gray-700 hover:bg-gray-50">
            <FaGoogle className="mr-2 text-purple-600" />
            Google
          </Button>
          <div className="text-center text-sm text-gray-500">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-bold text-purple-600 hover:text-purple-800">Entrar</Link>
          </div>
        </div>
      </main>
    </div>
  )
}