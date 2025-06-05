import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="bg-[#1F1F22] border-none">
      <CardContent className="p-6">
        <blockquote className="text-[#F4F4F5] mb-4">"{quote}"</blockquote>
        <div
          className="flex items-center justify-between text-[#F4F4F5] text-sm mt-10"
        >
          <Badge className="font-semibold text-purple-500 mr-2">{author}</Badge>
           <Badge className="bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30">
            <Star className="inline h-4 w-4" />
            {role}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
