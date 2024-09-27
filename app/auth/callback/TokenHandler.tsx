import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function TokenHandler({ onTokenReceived }: { onTokenReceived: (token: string | null) => void }) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token')
    onTokenReceived(tokenFromUrl)
  }, [searchParams, onTokenReceived])

  return null  // O componente não precisa renderizar nada
}
