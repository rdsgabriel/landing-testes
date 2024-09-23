'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePasswordTab(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('As novas senhas não coincidem');
      return;
    }
    
    try {
      const response = await fetch('http://35.199.77.49:9090/api/v1/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN_HERE',
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        setSuccess('Senha alterada com sucesso!');
        setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao alterar a senha');
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
            <h2 className="text-[32px] font-bold text-gray-500 leading-tight">Altere sua senha do <br className='hidden md:block' /> <span className='text-purple-600'>Task</span><span className='text-gray-800'>Freela.</span></h2>
            <p className="text-[14px] text-gray-500">Preencha os campos abaixo para alterar sua senha.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="currentPassword" className="block text-sm font-bold text-gray-500">Senha atual</Label>
              <Input id="currentPassword" type="password" placeholder="Sua senha atual" className="mt-1 text-black" value={formData.currentPassword} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="newPassword" className="block text-sm font-bold text-gray-500">Nova senha</Label>
              <Input id="newPassword" type="password" placeholder="Sua nova senha" className="mt-1 text-black" value={formData.newPassword} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="confirmNewPassword" className="block text-sm font-bold text-gray-500">Confirme a nova senha</Label>
              <Input id="confirmNewPassword" type="password" placeholder="Confirme sua nova senha" className="mt-1 text-black" value={formData.confirmNewPassword} onChange={handleChange} required />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <Button type="submit" className="w-full font-medium bg-purple-100 hover:bg-purple-600 hover:text-white text-purple-600 border-purple-600 border">
              Alterar senha
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            Voltar para efetuar o{' '}
            <Link href="/login" className="font-bold text-purple-600 hover:text-purple-800">Login</Link>
          </div>
        </div>
      </main>
    </div>
  )
}