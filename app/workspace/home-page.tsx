'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckSquare, Users, Briefcase, FileText, LayoutDashboard, ChevronLeft, Menu, Database, EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import SettingsModal from './settings-modal'
import jwt from 'jsonwebtoken';

// Aqui é a side-bar

export default function Workspace({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Token não encontrado.');
      return;
    }

    try {
      const decoded = jwt.decode(token);
      if (decoded && typeof decoded === 'object' && 'name' in decoded) {
        setName(decoded.name); // Acessa 'name' se existir
      }
    } catch (err) {
      setError('Erro ao decodificar o token.');
    }
  }, []); // useEffect sempre presente

  if (error) {
    return <div>{error}</div>;
  }


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || isMobileMenuOpen) && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '15rem', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white text-gray-800 h-full flex flex-col shadow-sm border-r border-gray-200"
          >
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center ml-2 space-x-3">
              
                <Image
                  src="https://media.licdn.com/dms/image/v2/D4D0BAQGo3WDhlYtsSA/company-logo_100_100/company-logo_100_100/0/1722364220298/engix_tech_logo?e=1734566400&v=beta&t=cDxl-LyHb1homY4dCmlh3HhIGXho85Z8xNd2fA725jA"
                  alt="Avatar"
                  width={8}
                  height={8}
                  className="h-8 w-8 rounded-full"
                />
       
                <h2 className="font-bold">{name}</h2>
                <button className=''>
                  <EllipsisVertical className='ml-20'size={15}/>
                  </button>
              </div>
              <button
                onClick={isMobileMenuOpen ? toggleMobileMenu : toggleSidebar}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 lg:hidden"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-3">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/workspace/dashboard" count={0} />
                <SidebarItem icon={CheckSquare} label="Tasks" href="/workspace/tasks" count={5} />
                <SidebarItem icon={Users} label="Clientes" href="/workspace/clients" count={3} />
                <SidebarItem icon={Briefcase} label="Projetos" href="/workspace/projects" count={7} />
                <SidebarItem icon={FileText} label="Contratos" href="/workspace/contracts" count={2} />
                <SidebarItem icon={Database} label="Armazenamento" href="/workspace/storage" count={0} />
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-200 flex justify-end">
              <SettingsModal/>
            </div>

          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-3 flex items-center shadow-sm">
          <button 
            onClick={toggleSidebar}
            className="p-2 mr-4 rounded-md hover:bg-gray-100 transition-colors duration-200 relative"
          >
            {isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
            {!isSidebarOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 0.7 }}
                className="absolute top-1 -right-0.5 w-2 h-2 bg-purple-500 rounded-full"
              />
            )}
          </button>
          <h1 className="text-lg font-semibold text-gray-800"><span className='text-purple-700'>Task</span>Freela</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarItem({
  icon: Icon,
  label,
  href,
  count,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  count: number;
}) {
  return (
    <li>
      <Link 
        href={href} 
        className="group flex items-center justify-between text-gray-600 py-2 px-3 rounded-md hover:bg-purple-50 transition-colors duration-200"
      >
        <div className="flex items-center">
          <Icon size={18} className="mr-3 text-gray-500 group-hover:text-purple-600 transition-colors duration-200" />
          <span className="text-sm">{label}</span>
        </div>
        {count > 0 && (
          <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full group-hover:text-purple-700 group-hover:bg-gray-100">
            {count}
          </span>
        )}
      </Link>
    </li>
  );
}