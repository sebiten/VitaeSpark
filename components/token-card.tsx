import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from 'lucide-react'

interface TokenCardProps {
  title: string
  tokens: number
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  popular?: boolean
}

export function TokenCard({
  title,
  tokens,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  popular = false,
}: TokenCardProps) {
  return (
    <Card className={`relative ${popular ? "border-[#7C3AED]" : "border-[#1F1F22]"} bg-[#0F0F10]`}>
      {popular && <Badge className="absolute top-0 right-6 -translate-y-1/2 bg-[#7C3AED]">Más popular</Badge>}
      <CardHeader className="pb-0">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-4 flex items-center text-[#F4F4F5]">
          <div className="flex items-center bg-[#7C3AED]/20 px-3 py-1.5 rounded-full">
            <Zap className="h-4 w-4 text-[#7C3AED] mr-1.5" />
            <span className="font-bold">{tokens} tokens</span>
          </div>
        </div>
        <div className="mt-3 flex items-baseline text-[#F4F4F5]">
          <span className="text-3xl font-bold tracking-tight">{price}</span>
          {period && <span className="ml-1 text-sm font-medium text-[#F4F4F5]/60">{period}</span>}
        </div>
        <p className="mt-2 text-sm text-[#F4F4F5]/70">{description}</p>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-[#38BDF8] mt-0.5 shrink-0" />
              <span className="text-sm text-[#F4F4F5]/80">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          variant={buttonVariant}
          className={`w-full ${
            buttonVariant === "default"
              ? "bg-[#7C3AED] hover:bg-[#A78BFA] text-white"
              : "border-[#1F1F22] text-[#F4F4F5] hover:bg-[#1F1F22]"
          }`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
