import { cn } from "@/lib/utils";
import { Bot, Brain, CheckCircle2, Clock, Users } from "lucide-react";
import { motion } from "motion/react";

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: "quiz" | "cards" | "session" | "ai";
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

const typeConfig = {
  quiz: {
    icon: CheckCircle2,
    bg: "oklch(0.7 0.17 162 / 0.15)",
    border: "oklch(0.7 0.17 162 / 0.3)",
    color: "oklch(0.72 0.15 162)",
  },
  cards: {
    icon: Brain,
    bg: "oklch(0.63 0.27 304 / 0.15)",
    border: "oklch(0.63 0.27 304 / 0.3)",
    color: "oklch(0.72 0.22 304)",
  },
  session: {
    icon: Users,
    bg: "oklch(0.77 0.19 70 / 0.15)",
    border: "oklch(0.77 0.19 70 / 0.3)",
    color: "oklch(0.78 0.17 70)",
  },
  ai: {
    icon: Bot,
    bg: "oklch(0.62 0.18 270 / 0.15)",
    border: "oklch(0.62 0.18 270 / 0.3)",
    color: "oklch(0.72 0.18 270)",
  },
};

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="flex flex-col gap-2" data-ocid="activity.list">
      {items.map((item, index) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.25,
              delay: 0.05 * index,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            data-ocid={`activity.item.${index + 1}`}
            className={cn(
              "group flex items-center gap-3 px-3 py-2.5 rounded-lg",
              "glass hover:border-border transition-smooth cursor-default",
            )}
          >
            {/* Icon */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: config.bg,
                border: `1px solid ${config.border}`,
              }}
            >
              <Icon size={14} style={{ color: config.color }} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium truncate">
                {item.text}
              </p>
            </div>

            {/* Time */}
            <div className="flex items-center gap-1 shrink-0 text-xs text-muted-foreground">
              <Clock size={11} />
              <span>{item.time}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
