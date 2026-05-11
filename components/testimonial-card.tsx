import { Quote, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { UnifiedCard } from "@/components/unified-card"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <UnifiedCard variant="testimonial" className="group relative">
      <div className="flex items-center justify-between mb-5">
<div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
            <Quote className="h-4 w-4 text-[#8B5CF6]" />
          </div>
<div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-3.5 w-3.5 fill-[#8B5CF6]/30 text-[#8B5CF6]/30" />
              ))}
            </div>
      </div>

      <blockquote className="mb-6 leading-relaxed text-white/70 text-sm">
        "{quote}"
      </blockquote>

      <div className="flex items-center justify-between gap-3">
        <Badge className="bg-white/[0.04] text-white/60 border-white/[0.08] font-medium text-xs px-3 py-1">
          {author}
        </Badge>
        <span className="text-xs text-white/40">{role}</span>
      </div>
    </UnifiedCard>
  )
}