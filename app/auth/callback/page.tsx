'use client'

import { Suspense } from "react"
import TokenHandler from "./TokenHandler"

export default function Home(){

  return (
    <Suspense>
      <TokenHandler></TokenHandler>
    </Suspense>
  )
}