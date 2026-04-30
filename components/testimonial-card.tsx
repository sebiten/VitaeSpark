import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { Badge } from "./ui/badge";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="group relative overflow-hidden border border-white/10 bg-[#15151A] shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-[#38BDF8]/25">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7C3AED]/10 blur-2xl transition group-hover:bg-[#38BDF8]/10" />
      <CardContent className="relative p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="rounded-2xl bg-[#7C3AED]/15 p-3 text-[#A78BFA] ring-1 ring-[#A78BFA]/20">
            <Quote className="h-5 w-5" />
          </div>
          <div className="flex gap-1 text-[#38BDF8]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>
        <blockquote className="mb-8 leading-7 text-[#F4F4F5]">
          "{quote}"
        </blockquote>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#F4F4F5]">
          <Badge className="bg-black/30 font-semibold text-purple-400 hover:bg-black/30">
            {author}
          </Badge>
          <Badge className="bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30">
            <Star className="inline h-4 w-4" />
            {role}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
