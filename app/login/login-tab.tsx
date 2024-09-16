import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FaGoogle } from 'react-icons/fa'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <header className="p-6 px-8 sm:p-6">
        <h1 className="text-2xl font-bold text-white"><span className='text-purple-600'>Task</span>Freela</h1>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-8 sm:p-6">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="space-y-2">
            <h2 className="text-[32px] font-bold text-gray-200 leading-tight">Seja bem-vindo(a) ao <br className='hidden md:block' /> <span className='text-purple-600'>Task</span><span className='text-white'>Freela.</span></h2>
            <p className="text-[14px] text-gray-200">Entre na sua conta para continuar</p>
          </div>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-purple-600">
              <TabsTrigger 
                value="email" 
                className="font-semibold text-gray-300 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-200"
              >
                Email
              </TabsTrigger>
              <TabsTrigger 
                value="sso" 
                className="font-semibold text-gray-300 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-300"
              >
                SSO
              </TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</Label>
                  <Input id="email" type="email" placeholder="Entre com seu email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-200">Senha</Label>
                  <Input id="password" type="password" placeholder="Entre com sua senha" className="mt-1" />
                </div>
                <div className="flex items-center">
                  <Checkbox id="remember" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded data-[state=checked]:bg-purple-600 " />
                  <Label htmlFor="remember" className="ml-2 block text-sm text-gray-200 font-bold">Lembrar-me</Label>
                </div>
                <Button className="w-full font-bold bg-purple-600 hover:bg-purple-700 text-white">
                  Entrar
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="sso">
              <div className="space-y-4">
                <Label htmlFor="sso-email" className="block text-sm font-medium text-gray-200">Email empresarial</Label>
                <Input id="sso-email" type="email" placeholder="nome@empresa.com" />
                <p className="text-sm text-gray-300">Use um email de uma corporação para colaborar facilmente com seus colegas de trabalho.</p>
                <Button className="w-full font-bold bg-purple-600 hover:bg-purple-700 text-gray-200">
                  Continuar com SSO
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-600 "></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-800 rounded-lg text-gray-300">OU CONTINUE COM</span>
            </div>
          </div>
          <Button variant="outline" className="w-full border border-gray-300 font-bold text-gray-200 hover:text-white hover:bg-purple-700">
            <FaGoogle className="mr-2 text-white" />
            Google
          </Button>
          <div className="text-center">
            <a href="#" className="text-sm text-gray-400  hover:text-purple-500">Esqueceu sua senha?</a>
          </div>
          <div className="text-center text-sm text-gray-400">
            Não tem uma conta ainda?{' '}
            <a href="#" className="font-medium text-purple-500 hover:text-purple-300 text-bold">Registrar</a>
          </div>
        </div>
      </main>
    </div>
  )
}