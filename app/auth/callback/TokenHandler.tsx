'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

export default function TokenHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  
  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' })
      
      const redirectTime = 4000
      const interval = 50
      let timer = 0
      const progressInterval = setInterval(() => {
        timer += interval
        const easeOutQuad = (t: number) => t * (2 - t)
        setProgress(easeOutQuad(timer / redirectTime) * 100)
        
        if (timer >= redirectTime) {
          clearInterval(progressInterval)
          setIsComplete(true)
          setTimeout(() => router.push('/workspace'), 1000)
        }
      }, interval)
      return () => clearInterval(progressInterval)
    } else {
      router.push('/login?error=Falha na autenticação')
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <motion.div
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-left mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-purple-300">Task</span>
            <span className="text-white">Freela</span>
          </h1>
          <p className="text-2xl text-purple-200 font-light">
            {isComplete ? 'Bem-vindo!' : 'Preparando seu espaço...'}
          </p>
        </div>
        <motion.div
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 relative mr-4">
              {!isComplete ? (
                <Loader2 className="w-12 h-12 text-purple-300 animate-spin" />
              ) : (
                <motion.svg
                  className="w-12 h-12 text-purple-400"
                  viewBox="0 0 24 24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <path
                    fill="currentColor"
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  />
                </motion.svg>
              )}
            </div>
            <p className="text-lg text-purple-100">
              {isComplete
                ? 'Seu espaço está pronto! Redirecionando para o workspace...'
                : 'Estamos configurando seu perfil e preparando tudo para você começar a usar o TaskFreela'}
            </p>
          </div>
          <div className="w-full">
            <Progress 
              value={progress} 
              className="h-2 bg-purple-900 bg-opacity-50" 
              style={{
                '--progress-background': 'rgba(139, 92, 246, 0.3)',
                '--progress-foreground': '#a78bfa'
              } as React.CSSProperties}
            />
          </div>
        </motion.div>
      </motion.div>
      <svg className="absolute bottom-0 right-0 w-64 h-64 text-purple-400 opacity-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" fill="currentColor"/>
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" fill="currentColor"/>
      </svg>
    </div>
  )
}