"use client"

import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"

export function EmptyState() {
  const router = useRouter()

  return (
    <div className="text-center py-16 px-6 bg-[#111113] rounded-xl border border-[#2A2A2D] max-w-md mx-auto">
      <User className="w-12 h-12 text-secondary mx-auto mb-4 opacity-50" />
      <h3 className="text-xl font-semibold text-[#F4F4F5] mb-2">
        No tienes CVs todavía
      </h3>
      <p className="text-[#A1A1AA] mb-6">
        Crea tu primer currículum con inteligencia artificial
      </p>
      <Button onClick={() => router.push("/crear")} className="bg-primary hover:bg-primary/90 text-primary-foreground">
        Crear mi primer CV
      </Button>
    </div>
  )
}