'use client'

import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
    setIsLoading(true);

    if (formData.password !== formData.passwordConfirm) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (!formData.terms) {
      setError('Você deve concordar com os Termos de Serviço e Política de Privacidade');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/reverseproxy?port=9090&action=signup', {
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
        setIsDrawerOpen(true);
        setProgress(0);
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao criar conta');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter()

  useEffect(() => {
    if (isDrawerOpen) {
      const redirectTime = 6500;
      const interval = 50;
      let timer = 0;

      const progressInterval = setInterval(() => {
        timer += interval;
        const easeOutQuad = (t: number) => t * (2 - t);
        setProgress(easeOutQuad(timer / redirectTime) * 100)
        
        if (timer >= redirectTime) {
          clearInterval(progressInterval);
          router.push('/login')
        }
      }, interval);

      return () => clearInterval(progressInterval);
    }
  }, [isDrawerOpen]);

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
            <div className="flex items-center">
              <Checkbox id="terms" className="h-4 w-4 text-purple-600 focus:ring-blue-500 border-gray-300 rounded data-[state=checked]:bg-purple-600" checked={formData.terms} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="terms" className="ml-2 block text-sm text-gray-500 mt-1">
                Eu concordo com os <a href="#" className="text-purple-600 hover:text-blue-800">Termos de Serviço</a> e <a href="#" className="text-purple-600 hover:text-blue-800">Política de Privacidade</a>
              </Label>
            </div>
            <Button type="submit" className="w-full font-medium bg-purple-100 hover:bg-purple-600 hover:text-white text-purple-600 border-purple-600 border" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando
                </>
              ) : (
                'Criar conta'
              )}
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
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="bg-gradient-to-br from-purple-50 to-white p-6 sm:p-8 h-[70%] rounded-t-[30px] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M0,0 Q50,50 100,0 V100 H0 Z"
                  fill="url(#gradient)"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DrawerHeader className="text-center relative z-10">
              <DrawerTitle className="text-3xl font-bold text-black mb-2">
                Conta criada com sucesso!
              </DrawerTitle>
              <DrawerDescription className="text-lg text-gray-500">
                Preparando seu espaço no <span className='text-purple-700 font-bold'>Task</span><span className='font-bold text-gray-700'>Freela</span>...
              </DrawerDescription>
            </DrawerHeader>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center flex-grow relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-24 h-24 relative mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200 opacity-25"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.svg
                  className="w-12 h-12 text-purple-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </div>
            </div>
            <motion.p
              className="text-base text-gray-500 text-center max-w-md mb-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Estamos configurando seu perfil e preparando tudo para você <span className='text-purple-700 font-bold'>  começar a usar o TaskFreela.</span> <br /> <br />
            </motion.p>
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Progress value={progress} className="h-2 bg-purple-50" style={{
                '--progress-background': 'white',
                '--progress-foreground': '#7c3aed'
              } as React.CSSProperties}/>
            </motion.div>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}