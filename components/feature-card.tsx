import type { ReactNode } from "react"
import { UnifiedCard } from "@/components/unified-card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <UnifiedCard variant="feature">
      <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] mb-4">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-white/90 mb-2">{title}</h3>
      <p className="text-sm text-white/90 leading-relaxed">{description}</p>
    </UnifiedCard>
  )
}