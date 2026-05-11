import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface UnifiedCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "feature" | "testimonial" | "blog" | "stat"
  hover?: boolean
}

export function UnifiedCard({
  children,
  className,
  variant = "default",
  hover = true,
}: UnifiedCardProps) {
  const baseStyles = "rounded-xl border border-white/[0.06] bg-[#1C1C22] transition-all duration-300"

  const hoverStyles = hover
    ? "hover:-translate-y-0.5 hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
    : ""

  const variantStyles = {
    default: "",
    feature: "p-6",
    testimonial: "p-6",
    blog: "p-6",
    stat: "p-6",
  }

  return (
    <div className={cn(baseStyles, hoverStyles, variantStyles[variant], className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold text-white/90", className)}>{children}</h3>
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-1.5 text-sm text-white/50", className)}>{children}</p>
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-4 flex items-center gap-3", className)}>{children}</div>
}

export function CardIcon({
  children,
  className,
  variant = "default"
}: {
  children: ReactNode
  className?: string
  variant?: "default" | "primary" | "secondary"
}) {
  const variantStyles = {
    default: "bg-white/[0.06] text-white/60",
    primary: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
    secondary: "bg-[#38BDF8]/10 text-[#38BDF8]",
  }

  return (
    <div className={cn("w-11 h-11 rounded-lg flex items-center justify-center", variantStyles[variant], className)}>
      {children}
    </div>
  )
}