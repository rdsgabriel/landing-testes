'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

const TaskFreelaLogo = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="200"
    height="50"
    viewBox="0 0 200 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 10H30V15H20V40H10V10Z M35 40V10H55L60 15H45V22H55L60 27H45V40H35Z M65 40V10H85L90 15H75V22H85L90 27H75V35H90V40H65Z M95 40V10H115L120 15H105V40H95Z"
      fill="#7C3AED"
    />
    <path
      d="M125 10H145V15H135V40H125V10Z M150 40V10H170V15H160V22H170V27H160V35H170V40H150Z M175 40V10H195V15H185V22H195V27H185V35H195V40H175Z"
      fill="#1F2937"
    />
  </svg>
)

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 relative">
      <div className="absolute inset-0 opacity-5">
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
        <div className="text-center mb-8">
          <TaskFreelaLogo className="mx-auto mb-4" />
          <h2 className="text-2xl text-gray-800 font-light">
            {isComplete ? 'Bem-vindo!' : 'Preparando seu espaço...'}
          </h2>
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 relative mr-4">
            {!isComplete ? (
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            ) : (
              <motion.svg
                className="w-12 h-12 text-green-500"
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
          <p className="text-lg text-gray-600">
            {isComplete
              ? 'Seu espaço está pronto! Redirecionando para o workspace...'
              : 'Estamos configurando seu perfil e preparando tudo para você começar a usar o TaskFreela'}
          </p>
        </div>
        <div className="w-full">
          <Progress 
            value={progress} 
            className="h-2" 
            style={{
              '--progress-background': '#F3F4F6',
              '--progress-foreground': '#7C3AED'
            } as React.CSSProperties}
          />
        </div>
      </motion.div>
    </div>
  )
}