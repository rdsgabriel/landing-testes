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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M0,0 Q50,50 100,0 V100 H0 Z"
                  fill="url(#gradient)"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(129, 140, 248, 0.1)" />
                    <stop offset="100%" stopColor="rgba(236, 72, 153, 0.1)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h1 className="text-4xl font-extrabold text-white mb-2">
              {isComplete ? 'Bem-vindo!' : 'Autenticando...'}
            </h1>
            <p className="text-xl text-indigo-200 mb-8">
              Preparando seu espaço no <span className="text-pink-400 font-bold">Task</span><span className="font-bold text-indigo-300">Freela</span>
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-32 h-32 relative mb-8">
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  <motion.div
                    key="loading"
                    className="absolute inset-0"
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-200 opacity-25"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-16 h-16 text-indigo-400 animate-spin" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="complete"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="w-24 h-24 text-green-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.p
              className="text-lg text-indigo-200 text-center max-w-md mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {isComplete
                ? 'Seu espaço está pronto! Redirecionando para o workspace...'
                : 'Estamos configurando seu perfil e preparando tudo para você começar a usar o TaskFreela'}
            </motion.p>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Progress 
                value={progress} 
                className="h-2 bg-indigo-900/50" 
                style={{
                  '--progress-background': 'rgba(255, 255, 255, 0.1)',
                  '--progress-foreground': 'linear-gradient(90deg, #818cf8, #ec4899)'
                } as React.CSSProperties}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}