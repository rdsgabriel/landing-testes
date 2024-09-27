'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle } from 'lucide-react'
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
      const interval = 16 // Increased for smoother animation
      let timer = 0
      const progressInterval = setInterval(() => {
        timer += interval
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
        setProgress(easeOutCubic(timer / redirectTime) * 100)
        
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
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
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.h2
              key={isComplete ? 'complete' : 'loading'}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-2xl text-gray-700 font-semibold text-center mb-6"
            >
              {isComplete ? 'Bem-vindo ao TaskFreela!' : 'Preparando seu espaço...'}
            </motion.h2>
          </AnimatePresence>
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 relative mr-6">
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={isComplete ? 'complete' : 'loading'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-lg text-gray-600 flex-1"
              >
                {isComplete
                  ? 'Seu espaço está pronto! Redirecionando para o workspace...'
                  : 'Estamos configurando seu perfil e preparando tudo para você começar.'}
              </motion.p>
            </AnimatePresence>
          </div>
          <Progress value={progress} className="h-2" style={{ '--progress-background': '#E9D5FF', '--progress-foreground': '#7C3AED' } as React.CSSProperties}></Progress>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-indigo-200 to-transparent opacity-50" />
    </div>
  )
}