import { Suspense } from "react"
import { Loader2 } from 'lucide-react'
import AuthPageClient from "./auth-page-client"

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#0F0F10]">
        <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />
      </div>
    }>
      <AuthPageClient />
    </Suspense>
  )
}
