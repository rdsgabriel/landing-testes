'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function TokenHandler() {
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token')
    setToken(tokenFromUrl)
  }, [searchParams])

  return token
}