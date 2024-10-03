'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, Users, Briefcase, FileText, LayoutDashboard, ChevronLeft, ChevronRight, Database, Menu } from 'lucide-react'
import Link from 'next/link'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import SettingsModal from './settings-modal'

export default function Workspace({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [name, setName] = useState<string | null>(null)
  const [error, setError] = useState<string>('')

  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenFromURL = searchParams.get('token')

    if (tokenFromURL) {
      Cookies.set('token', tokenFromURL, { expires: 7, secure: true, sameSite: 'strict' })
    }

    const token = tokenFromURL || Cookies.get('token')

    if (!token) {
      setError('Token não encontrado.')
      return
    }

    try {
      const decoded = jwt.decode(token)
      if (typeof decoded === 'object' && decoded !== null && 'name' in decoded) {
        setName(decoded.name as string)
      } else {
        setError('Nome não encontrado no token.')
      }
    } catch (err) {
      setError('Erro ao decodificar o token.')
      console.error(err)
    }
  }, [searchParams])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <TooltipProvider>
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? '240px' : '64px', x: (!isSidebarOpen && window.innerWidth < 768) ? '-100%' : '0%' }}
          className="bg-white text-gray-800 h-full flex flex-col shadow-sm border-r border-gray-200 z-20 fixed md:relative"
        >
          <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200">
            {isSidebarOpen && (
              <div className="flex items-center space-x-3 w-full">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <h2 className="font-bold text-sm truncate">{name || 'User'}</h2>
                  {error && <div className="text-red-500 text-xs truncate">{error}</div>}
                </div>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className={isSidebarOpen ? "ml-auto" : ""}>
              {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </Button>
          </div>

          <nav className={`flex-1 overflow-y-auto py-4 ${!isSidebarOpen ? 'hidden md:block' : ''}`}>
            <ul className="space-y-1 px-3">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/workspace/dashboard" count={0} isOpen={isSidebarOpen} />
              <SidebarItem icon={CheckSquare} label="Tasks" href="/workspace/tasks" count={5} isOpen={isSidebarOpen} />
              <SidebarItem icon={Users} label="Clientes" href="/workspace/clients" count={3} isOpen={isSidebarOpen} />
              <SidebarItem icon={Briefcase} label="Projetos" href="/workspace/projects" count={7} isOpen={isSidebarOpen} />
              <SidebarItem icon={FileText} label="Contratos" href="/workspace/contracts" count={2} isOpen={isSidebarOpen} />
              <SidebarItem icon={Database} label="Armazenamento" href="/workspace/storage" count={0} isOpen={isSidebarOpen} />
            </ul>
          </nav>

          <div className={`h-14 flex items-center ${isSidebarOpen ? 'justify-end px-4' : 'justify-center'} border-t border-gray-200 ${!isSidebarOpen ? 'hidden md:flex' : ''}`}>
            <SettingsModal />
          </div>
        </motion.aside>
      </TooltipProvider>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 shadow-sm">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden mr-2">
            <Menu size={18} />
          </Button>
          <h1 className="text-lg font-semibold text-gray-800">
            <span className='text-purple-700'>Task</span>Freela
          </h1>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon: Icon, label, href, count, isOpen }: { icon: React.ElementType; label: string; href: string; count: number; isOpen: boolean; }) {
  return (
    <li>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className={`group flex items-center justify-between text-gray-600 py-2 px-3 rounded-md hover:bg-purple-50 transition-colors duration-200 ${isOpen ? '' : 'justify-center'}`}>
            <div className="flex items-center">
              <Icon size={18} className="text-gray-500 group-hover:text-purple-600 transition-colors duration-200" />
              {isOpen && <span className="text-sm ml-3">{label}</span>}
            </div>
            {isOpen && count > 0 && (
              <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full group-hover:text-purple-700 group-hover:bg-gray-100">
                {count}
              </span>
            )}
          </Link>
        </TooltipTrigger>
        {!isOpen && (
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </li>
  )
}
