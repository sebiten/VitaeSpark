import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-[#1F1F22] border-none">
      <CardContent className="p-6">
        <div className="bg-[#38BDF8]/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-[#7C3AED]/80">{title}</h3>
        <p className="text-[#F4F4F5]">{description}</p>
      </CardContent>
    </Card>
  )
}
