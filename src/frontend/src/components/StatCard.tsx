import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accentColor?: string;
  delay?: number;
  ocid?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp,
  delay = 0,
  ocid,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      data-ocid={ocid}
      className={cn(
        "group relative overflow-hidden rounded-xl p-4",
        "glass border border-border",
        "hover:glow-indigo transition-smooth cursor-default select-none",
        "hover:border-primary",
      )}
      style={{ borderColor: "oklch(0.28 0.02 260 / 0.4)" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(0.62 0.18 270 / 0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Icon chip */}
      <div
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center mb-3",
          "transition-smooth group-hover:scale-110",
        )}
        style={{
          background: "oklch(0.62 0.18 270 / 0.15)",
          border: "1px solid oklch(0.62 0.18 270 / 0.3)",
        }}
      >
        <Icon size={18} style={{ color: "oklch(0.72 0.18 270)" }} />
      </div>

      {/* Value */}
      <div className="font-display text-2xl font-bold text-foreground leading-none mb-1">
        {value}
      </div>

      {/* Label */}
      <div className="text-xs text-muted-foreground font-medium">{label}</div>

      {/* Trend */}
      {trend && (
        <div
          className={cn(
            "mt-2 text-xs font-medium",
            trendUp ? "text-emerald-400" : "text-rose-400",
          )}
        >
          {trendUp ? "↑" : "↓"} {trend}
        </div>
      )}
    </motion.div>
  );
}
