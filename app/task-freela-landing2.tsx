import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, CheckCircle2, Clock, DollarSign, UserPlus, ListTodo, FolderPlus, FileText, CalendarClock, ArrowDown, MenuIcon} from 'lucide-react'
import Link from 'next/link';

export default function TaskFreelaLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex flex-col">
      {/* Enhanced Header with Purple Accent */}
      <header className="py-6 px-6 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-purple-600 border-2 flex items-center justify-center rounded-md">
              <span className="text-purple-600 border-black font-bold text-lg">
                <ListTodo/>
              </span>
            </div>
            <span className="text-2xl font-bold text-gray-900"><span className='text-purple-600'>Task</span>Freela</span>
          </div>
          <div className='space-x-4 md:hidden'><span className="text-blackborder-black font-bold text-lg">
                <MenuIcon/>
              </span></div>
          <nav className="space-x-4 hidden md:block">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Funcionalidades</Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Preços</Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">Sobre nós</Button>
            <Link href="/login">
              <Button variant="outline" className="text-purple-600 bg-purple-50 border-purple-600 hover:bg-purple-600 hover:text-white">
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 md:mt-32 md:mb-32 mb-6 mt-2">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Value Proposition */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">Simplifique <br />seus trabalhos como freelancer.</h1>
            <p className="text-xl text-gray-600">
              TaskFreela te ajuda a gerenciar seus projetos e clientes,  <span className='text-purple-600 font-semibold'>rastrear o tempo</span> gasto e a  <span className='text-purple-600 font-semibold'>gerar contratos</span> com nossa  <span className='text-purple-600 font-semibold'>Inteligência Artificial</span> - simples assim.
            </p>
            <div className="flex space-x-4">
            <Button variant="outline" className="text-purple-600 bg-purple-50 border-purple-600 hover:bg-purple-600 hover:text-white">Começar de graça</Button>
              <Button variant="outline" className="text-gray-900 border-gray-300 hover:bg-gray-200">
                Ver como funciona
              </Button>
            </div>
          </div>

          {/* Right side - Feature Preview */}
          <Card className="shadow-lg border border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-900 text-white p-4">
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
                    <Input placeholder="Add uma nova task..." className="flex-grow mr-2" />
                    <Button size="icon" variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <TaskItem title="Desenhar Landing page" completed={true} />
                    <TaskItem title="Desenvolver plano semanal" completed={false} />
                    <TaskItem title="Gerar NF para João" completed={false} />
                  </div>
                </TabsContent>
                <TabsContent value="time" className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Tempo gasto nos projetos:</span>
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

      <div className='mx-4'>
        
      <div className="flex justify-center mb-2">
          <ArrowDown className="w-8 h-8 md:w-12 md:h-16 text-purple-600 animate-bounce" />
        </div>

        {/* Step Guide */}
        <StepGuide />
      </div>
    </div>
  )
}

function TaskItem({ title, completed }: { title: string; completed: boolean }) {
  return (
    <div className={`flex items-center p-2 rounded ${completed ? 'bg-purple-50' : 'bg-white border border-gray-200'}`}>
      <CheckCircle2 className={`h-5 w-5 mr-2 ${completed ? 'text-purple-600' : 'text-gray-300'}`} />
      <span className={completed ? 'line-through text-gray-500' : ''}>{title}</span>
    </div>
  )
}

function TimeEntry({ project, duration }: { project: string; duration: string }) {
  return (
    <div className="flex justify-between items-center p-2 bg-white border border-gray-200 rounded">
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-2 text-purple-600" />
        <span>{project}</span>
      </div>
      <span className="text-purple-600 font-semibold">{duration}</span>
    </div>
  )
}

function InvoiceItem({ client, amount, status }: { client: string; amount: number; status: string }) {
  return (
    <div className="flex justify-between items-center p-2 bg-white border border-gray-200 rounded">
      <div>
        <span className="font-semibold">{client}</span>
        <span className={`ml-2 text-sm ${status === 'Pago' ? 'text-purple-600' : 'text-gray-500'}`}>{status}</span>
      </div>
      <div className="flex items-center">
        <DollarSign className="h-4 w-3 mr-1 text-purple-600" />
        <span className="font-semibold">{amount.toFixed(2)}</span>
      </div>
    </div>

  )
}

  function StepGuide() {
    const steps = [
      {
        title: "Cadastrar Cliente",
        description: "Adiciona um novo cliente na sua conta.",
        icon: <UserPlus className="w-6 h-6" />,
      },
      {
        title: "Criar Projeto",
        description: "Cria um novo projeto, para um cliente novo ou antigo.",
        icon: <FolderPlus className="w-6 h-6" />,
      },
      {
        title: "Add Tasks",
        description: "Divida o projeto em tasks que te ajudam a se organizar de maneira simples.",
        icon: <ListTodo className="w-6 h-6" />,
      },
      {
        title: "Organize sua rotina",
        description: "Organize tasks e atividades do seu dia que são recorrentes.",
        icon: <CalendarClock className="w-6 h-6" />,
      },
      {
        title: "Gere Contratos",
        description: "Use nossa IA para criar um contrato simples e customizado.",
        icon: <FileText className="w-6 h-6" />,
      },
    ]
  
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Como o <span className='text-purple-600'>Task</span>Freela funciona</h2>
        <div className="relative">
          
          <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-purple-200"></div>
          
          
          {steps.map((step, index) => (
            <div key={index} className="relative mb-8 ml-8">
              {/* Step number circle */}
              <div className="absolute -left-8 mt-1.5 w-7 h-7 bg-purple-100 border-purple-600 border rounded-full flex items-center justify-center text-purple-600 font-bold">
                {index + 1}
              </div>
              
              <Card>
                <CardContent className="pl-1 p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 text-purple-600">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    )

}