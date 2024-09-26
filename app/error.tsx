'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ErrorPage({ error }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Oops! Algo deu errado.</h1>
      <p className="text-xl mb-4">{error.message}</p>
      <button
        onClick={() => router.push('/login')}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Voltar para o login
      </button>
    </div>
  )
}