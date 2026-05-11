import { Bot } from "lucide-react";

interface FloatingRobotProps {
  size?: "sm" | "md" | "lg";
  position?: string;
  className?: string;
}

export function FloatingRobot({ size = "md", className = "" }: FloatingRobotProps) {
  const sizes = {
    sm: { container: "h-16 w-16", icon: "h-8 w-8" },
    md: { container: "h-24 w-24", icon: "h-12 w-12" },
    lg: { container: "h-32 w-32", icon: "h-16 w-16" },
  };

  const s = sizes[size];

  return (
    <div
      className={`pointer-events-none absolute flex items-center justify-center rounded-full border border-[#38BDF8]/10 bg-[#38BDF8]/[0.03] text-[#38BDF8]/30 ${s.container} ${className}`}
    >
      <div className="absolute inset-2 rounded-full border border-[#8B5CF6]/10" />
      <Bot className={s.icon} strokeWidth={1.2} />
    </div>
  );
}