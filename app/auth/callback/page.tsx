'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { TokenHandler } from './TokenHandler'

export default function AuthCallback() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
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
          router.push('/workspace')
        }
      }, interval)

      return () => clearInterval(progressInterval)
    } else if (token === null) {
      router.push('/login?error=Falha na autenticação')
    }
  }, [router, token])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="w-full max-w-md">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M0,0 Q50,50 100,0 V100 H0 Z"
                  fill="url(#gradient)"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Autenticando...</h1>
            <p className="text-lg text-gray-600 mb-6">
              Preparando seu espaço no <span className="text-purple-600 font-bold">Task</span><span className="font-bold text-gray-700">Freela</span>
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-24 h-24 relative mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200 opacity-25"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
              </div>
            </div>

            <motion.p
              className="text-base text-gray-500 text-center max-w-md mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Estamos configurando seu perfil e preparando tudo para você começar a usar o <span className="text-purple-600 font-bold">Task</span><span className="font-bold text-gray-700">Freela</span>
            </motion.p>

            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Progress 
                value={progress} 
                className="h-2 bg-purple-100" 
                style={{
                  '--progress-background': 'white',
                  '--progress-foreground': '#7c3aed'
                } as React.CSSProperties}
              />
            </motion.div>
          </motion.div>

          <Suspense fallback={<div>Carregando token...</div>}>
            <TokenHandler onTokenReceived={setToken} />
          </Suspense>
        </motion.div>
      </div>
    </div>
  )
}
