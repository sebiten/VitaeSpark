import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="bg-[#1F1F22] border-none">
      <CardContent className="p-6">
       
        <blockquote className="text-[#F4F4F5] mb-4">"{quote}"</blockquote>
        <div>
          <p className="font-semibold text-purple-500">{author}</p>
          <p className="text-sm text-[#F4F4F5]/60">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}
