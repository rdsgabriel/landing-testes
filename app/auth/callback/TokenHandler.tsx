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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            <span className="text-purple-600">Task</span>
            <span className="text-black">Freela</span>
          </h1>
        </div>
        <motion.div
          className="bg-white p-8 rounded-lg shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-medium text-gray-700 mb-6 text-center">
            {isComplete ? 'Bem-vindo!' : 'Autenticando...'}
          </h2>
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 relative mb-6">
              {!isComplete ? (
                <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
              ) : (
                <motion.svg
                  className="w-16 h-16 text-purple-500"
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
            <p className="text-sm text-gray-600 text-center max-w-xs mb-6">
              {isComplete
                ? 'Seu espaço está pronto! Redirecionando para o workspace...'
                : 'Estamos configurando seu perfil e preparando tudo para você começar a usar o TaskFreela'}
            </p>
            <div className="w-full">
              <Progress 
                value={progress} 
                className="h-1 bg-gray-100" 
                style={{
                  '--progress-background': '#f3f4f6',
                  '--progress-foreground': '#7c3aed'
                } as React.CSSProperties}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
