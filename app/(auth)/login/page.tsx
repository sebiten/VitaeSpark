import { Suspense } from "react"
import { Loader2 } from 'lucide-react'
import AuthPageClient from "./auth-page-client"

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#111113]">
        <Loader2 className="h-8 w-8 animate-spin text-[#8B5CF6]" />
      </div>
    }>
      <AuthPageClient />
    </Suspense>
  )
}
