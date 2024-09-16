'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, CheckCircle2, Clock, DollarSign, UserPlus, ListTodo, FolderPlus, FileText, CalendarClock, ArrowDown, Menu, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900 flex flex-col relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sphere-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(128, 90, 213, 0.1)" />
              <stop offset="100%" stopColor="rgba(128, 90, 213, 0)" />
            </radialGradient>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#line-gradient)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(128, 90, 213, 0.3)" />
              <stop offset="50%" stopColor="rgba(128, 90, 213, 0.1)" />
              <stop offset="100%" stopColor="rgba(128, 90, 213, 0.3)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#sphere-gradient)" />
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <header className="py-6 px-6 bg-white bg-opacity-90 shadow-sm border-b border-gray-200 relative z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-gray-900"><span className='text-purple-600'>Task</span>Freela</span>
          </div>
          <div className='md:hidden'>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-gray-800" />
            </Button>
          </div>
          <nav className="space-x-4 hidden md:block">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Funcionalidades</Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Preços</Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Sobre nós</Button>
            <Link href="/login">
              <Button variant="outline" className="text-purple-600 bg-white border-purple-600 hover:bg-purple-600 hover:text-white">
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <span className="text-2xl font-bold text-gray-900"><span className='text-purple-600'>Task</span>Freela</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-800" />
                </Button>
              </div>
              <nav className="flex flex-col p-6 space-y-4">
                <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100">Funcionalidades</Button>
                <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100">Preços</Button>
                <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100">Sobre nós</Button>
                <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full text-purple-600 bg-white border-purple-600 hover:bg-purple-600 hover:text-white">
                    Entrar
                  </Button>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
      <main className="flex-grow flex items-center justify-center p-6 md:mt-32 md:mb-32 mb-6 mt-2 relative z-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">Simplifique <br />seus trabalhos como freelancer.</h1>
            <p className="text-xl text-gray-600">
              TaskFreela te ajuda a gerenciar seus projetos e clientes, <span className='text-purple-600 font-semibold'>rastrear o tempo</span> gasto e a <span className='text-purple-600 font-semibold'>gerar contratos</span> com nossa <span className='text-purple-600 font-semibold'>Inteligência Artificial</span> - simples assim.
            </p>
            <div className="flex space-x-4">
              <Link href='/register'>
                <Button variant="outline" className="text-purple-600 bg-purple-50 border-purple-600 hover:bg-purple-600 hover:text-white">Comece agora</Button>
              </Link>
              <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-900">
                Ver como funciona
              </Button>
            </div>
          </div>

          
          <Card className="shadow-lg border border-gray-200 overflow-hidden bg-white">
            <CardHeader className="bg-gray-200 text-gray-800 p-4">
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="tasks" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-gray-200">
                  <TabsTrigger value="tasks" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">Tasks</TabsTrigger>
                  <TabsTrigger value="time" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">Tempo</TabsTrigger>
                  <TabsTrigger value="invoices" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">Clientes</TabsTrigger>
                </TabsList>
                <TabsContent value="tasks" className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Input readOnly={true} placeholder="Add uma nova task..." className="flex-grow mr-2 bg-white text-gray-800 border-gray-300" />
                    <Button size="icon" variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 text-base">
                    <TaskItem title="Desenhar Landing page" completed={true} />
                    <TaskItem title="Desenvolver plano semanal" completed={false} />
                    <TaskItem title="Gerar NF para João" completed={false} />
                  </div>
                </TabsContent>
                <TabsContent value="time" className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Tempo gasto nos projetos:</span>
                    </div>
                    <TimeEntry project="TechCorp" duration="2h 15m" />
                    <TimeEntry project="Engix" duration="1h 45m" />
                    <TimeEntry project="DesignHub" duration="35m" />
                  </div>
                </TabsContent>
                <TabsContent value="invoices" className="p-4">
                  <div className="space-y-4">
                    <InvoiceItem client="TechCorp" amount={1500} status="Pago" />
                    <InvoiceItem client="DesignHub" amount={750} status="Pendente" />
                    <InvoiceItem client="StartupX" amount={2000} status="Pendente" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <div className='mx-4 relative z-10'>
        <div className="flex justify-center mb-2">
          <ArrowDown className="w-8 h-8 md:w-12 md:h-16 text-purple-600 animate-bounce" />
        </div>

        {/* Step Guide */}
        <StepGuide />
      </div>

      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Transforme sua carreira <span className="text-purple-600">freelancer</span></h2>
          <p className="text-xl text-gray-600 mb-8">
            Com TaskFreela, você tem todas as ferramentas necessárias para gerenciar seus projetos, 
            clientes e contratos em um só lugar. Simplifique sua rotina, aumente sua produtividade 
            e foque no que realmente importa: entregar trabalhos excepcionais.
          </p>
          <Link href="/register">
            <Button className="bg-purple-100 text-purple-600 hover:bg-purple-700 border border-purple-600 hover:text-white">
              Comece sua jornada agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Revised Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Task<span className="text-purple-600">Freela</span></h3>
              <p className="text-gray-600">Simplifique sua vida como freelancer.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Produto</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Funcionalidades</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Preços</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Empresa</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Sobre nós</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Carreiras</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Conecte-se</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Twitter</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Facebook</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2023 TaskFreela. Todos os direitos reservados. Feito por <a href='https://engix.tech' className='text-blue-700 font-bold'>Engix</a>.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TaskItem({ title, completed }: { title: string; completed: boolean }) {
  return (
    <div className={`flex items-center p-2 rounded ${completed ? 'bg-purple-50' : 'bg-white border border-gray-200'}`}>
      <CheckCircle2 className={`h-5 w-5 mr-2 ${completed ? 'text-purple-600' : 'text-gray-300'}`} />
      <span className={completed ? 'line-through text-gray-500' : 'text-gray-800'}>{title}</span>
    </div>
  )
}

function TimeEntry({ project, duration }: { project: string; duration: string }) {
  return (
    <div className="flex justify-between items-center p-2 bg-white border border-gray-200 rounded">
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-2 text-purple-600" />
        <span className="text-gray-800">{project}</span>
      </div>
      <span className="text-purple-600 font-semibold">{duration}</span>
    </div>
  )
}

function InvoiceItem({ client, amount, status }: { client: string; amount: number; status: string }) {
  return (
    <div className="flex justify-between items-center p-2 bg-white border border-gray-200 rounded">
      <div>
        <span className="font-semibold text-gray-800">{client}</span>
        <span className={`ml-2 text-sm ${status === 'Pago' ? 'text-purple-600' : 'text-gray-500'}`}>{status}</span>
      </div>
      <div className="flex items-center">
        <DollarSign className="h-4 w-3 mr-1 text-purple-600" />
        <span className="font-semibold text-gray-800">{amount.toFixed(2)}</span>
      </div>
    </div>
  )
}

function StepGuide() {
  const steps = [
    {
      title: "Simplifique seu cadastro de clientes",
      description: "Adicione facilmente novos clientes à sua conta em segundos, sem complicações.",
      icon: <UserPlus className="w-5 h-5" />,
    },
    {
      title: "Crie projetos com agilidade",
      description: "Lance novos projetos de forma rápida, para clientes novos ou já cadastrados, e dê o primeiro passo rumo ao sucesso.",
      icon: <FolderPlus className="w-5 h-5" />,
    },
    {
      title: "Organize e conquiste com tasks",
      description: "Transforme grandes projetos em pequenas tasks que te ajudam a manter o controle e a produtividade elevada.",
      icon: <ListTodo className="w-5 h-5" />,
    },
    {
      title: "Domine sua rotina diária",
      description: "Mantenha suas atividades diárias organizadas e nunca perca um prazo importante com nossa gestão inteligente de tarefas.",
      icon: <CalendarClock className="w-5 h-5" />,
    },
    {
      title: "Gere contratos personalizados em minutos",
      description: "Crie contratos sob medida com a ajuda da nossa IA e feche acordos com confiança e rapidez.",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Como o <span className='text-purple-600'>Task</span><span className='text-gray-900'>Freela</span> funciona
      </h2>
    
      <div className="relative md:w-2/3 mx-auto">
        <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-purple-100"></div>
    
        {steps.map((step, index) => (
          <StepItem key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  )
}

function StepItem({ step, index }: { step: { title: string; description: string; icon: React.ReactNode }; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative mb-8 ml-8"
    >
      <div className="absolute -left-8 mt-1.5 w-7 h-7 bg-purple-100 border-purple-600 border rounded-full flex items-center justify-center text-purple-600 font-bold">
        {index + 1}
      </div>

      <Card className="bg-white border-gray-200">
        <CardContent className="pl-1 p-6">
          <div className="flex items-center mb-4">
            <div className="mr-4 text-purple-600">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
          </div>
          <p className="text-gray-600 mb-2 text-base">{step.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function useInView(options: { triggerOnce: boolean; threshold: number }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return [ref, inView] as const
}