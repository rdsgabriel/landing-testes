'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

export default function TokenHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  
  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' })
      
      const redirectTime = 4000
      const interval = 16
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
    <div className="min-h-screen flex items-end justify-center ">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="bg-gradient-to-br from-white via-purple-50 to-purple-200 backdrop-filter backdrop-blur-lg p-6 sm:p-8 rounded-t-[30px] overflow-hidden h-[70%] border-none shadow-lg">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
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
            className="relative z-10 max-w-md mx-auto h-full flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={isComplete ? 'complete' : 'loading'}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="text-3xl text-gray-800 font-bold text-center mb-12"
              >
                {isComplete ? (
                  <span>Bem vindo ao <span className='text-purple-600'>Task</span>Freela</span>
                ) : (
                  'Preparando seu espaço...'
                )}
              </motion.h2>
            </AnimatePresence>

            <div className="flex flex-col items-center justify-center mb-12">
              <div className="w-24 h-24 relative mb-8">
                <AnimatePresence mode="wait">
                  {!isComplete ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Loader2 className="w-24 h-24 text-purple-600 animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <CheckCircle className="w-24 h-24 text-purple-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={isComplete ? 'complete' : 'loading'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl text-gray-600 text-center"
                >
                  {isComplete
                    ? 'Seu espaço está pronto! Redirecionando...'
                    : 'Estamos configurando seu perfil e preparando tudo para você começar.'}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-sm mx-auto"
            >
              <Progress value={progress} className="h-2" style={{ '--progress-background': '#E9D5FF', '--progress-foreground': '#7C3AED' } as React.CSSProperties} />
              <p className="text-sm text-gray-500 text-center mt-2">
                {Math.round(progress)}% concluído
              </p>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-50 pointer-events-none" />
        </DrawerContent>
      </Drawer>
    </div>
  )
}