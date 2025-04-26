import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
}

export function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <Card className="bg-[#1F1F22] border-none">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-[#38BDF8] fill-[#38BDF8]" : "text-[#F4F4F5]/20"}`} />
          ))}
        </div>
        <blockquote className="text-[#F4F4F5] mb-4">"{quote}"</blockquote>
        <div>
          <p className="font-semibold text-[#F4F4F5]">{author}</p>
          <p className="text-sm text-[#F4F4F5]/60">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}
