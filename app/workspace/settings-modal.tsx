'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Settings } from 'lucide-react'

export default function SettingsModal() {
  const [activeTab, setActiveTab] = useState('perfil')
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Perfil</h3>
            <p className="text-sm text-gray-600">Estas informações serão exibidas publicamente, então tenha cuidado com o que você compartilha.</p>
            
            <div className="space-y-2">
              <Label htmlFor="username" className="block text-sm font-bold text-gray-500">Nome de usuário</Label>
              <Input id="username" placeholder="Seu nome de usuário" />
              <p className="text-xs text-gray-500">Este é o seu nome público. Pode ser seu nome real ou um pseudônimo.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-bold text-gray-500">Email</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um email verificado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email1">usuario@taskfreela.com</SelectItem>
                  <SelectItem value="email2">contato@taskfreela.com</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Você pode gerenciar endereços de email verificados nas configurações de email.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio" className="block text-sm font-bold text-gray-500">Biografia</Label>
              <Textarea id="bio" placeholder="Conte-nos um pouco sobre você" />
              <p className="text-xs text-gray-500 pb-48">Escreva algumas frases sobre você.</p>
            </div>
            
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Atualizar perfil</Button>
          </div>
        )
      case 'conta':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Configurações da conta</h3>
            <p className="text-sm text-gray-600">Gerencie as configurações da sua conta aqui.</p>
          </div>
        )
      case 'aparência':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Configurações de aparência</h3>
            <p className="text-sm text-gray-600">Personalize a aparência do TaskFreela.</p>
          </div>
        )
      case 'notificações':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Configurações de notificações</h3>
            <p className="text-sm text-gray-600">Gerencie suas preferências de notificação.</p>
          </div>
        )
      case 'display':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Configurações de exibição</h3>
            <p className="text-sm text-gray-600">Personalize como o TaskFreela é exibido para você.</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Settings size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-y-auto">
        <div className="flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 bg-blue-500 min-h-full"> 
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

          <header className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
            <Link href='/'>
              <h1 className="text-lg font-bold text-gray-800"><span className='text-purple-600'>Task</span>Freela</h1>
            </Link>
          </header>
          
          {/* Mobile Menu - Always visible */}
          <nav className="sm:hidden bg-white border-b border-gray-200 sticky top-0 z-10">
            <ul className="flex justify-around p-2">
              {['perfil', 'conta', 'aparência', 'notificações', 'display'].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm px-2 py-1 rounded-md transition-colors duration-200 ${
                      activeTab === tab
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'text-gray-600'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-grow flex overflow-hidden">
            {/* Desktop Sidebar - Unchanged */}
            <nav className="hidden sm:block w-64 bg-white p-6 border-r border-gray-200 overflow-y-auto">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Configurações</h2>
              <ul className="space-y-2">
                {['perfil', 'conta', 'aparência', 'notificações', 'display'].map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left text-sm px-4 py-2 rounded-md transition-colors duration-200 ${
                        activeTab === tab
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'text-gray-600 hover:bg-purple-50'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex-1 p-8 overflow-y-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}