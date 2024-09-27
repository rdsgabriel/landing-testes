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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-purple-50 p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7C3AED" strokeWidth="1"/>
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
        <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl text-gray-500 font-medium text-center mb-4">
            {isComplete ? 'Bem-vindo ao TaskFreela!' : 'Preparando seu espaço...'}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 relative mr-4">
              {!isComplete ? (
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
              ) : (
                <motion.svg
                  className="w-12 h-12 text-purple-500"
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
            <p className="text-lg text-gray-400">
              {isComplete
                ? 'Seu espaço está pronto! Redirecionando para o workspace...'
                : 'Estamos configurando seu perfil e preparando tudo para você começar.'}
            </p>
          </div>
          <Progress 
            value={progress} 
            className="h-2" 
            style={{
              '--progress-background': '#E9D5FF',
              '--progress-foreground': '#7C3AED'
            } as React.CSSProperties}
          />
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-100 to-transparent opacity-50" />
    </div>
  )
}