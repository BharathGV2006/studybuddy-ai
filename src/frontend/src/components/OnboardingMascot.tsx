import { type TargetAndTransition, motion } from "motion/react";

interface OnboardingMascotProps {
  speech: string;
  variant?: "wave" | "point" | "think";
}

const INF = Number.POSITIVE_INFINITY;

export function OnboardingMascot({
  speech,
  variant = "wave",
}: OnboardingMascotProps) {
  const eyeVariants = {
    blink: {
      scaleY: [1, 0.1, 1],
      transition: { duration: 0.2, repeat: INF, repeatDelay: 3 },
    },
  };

  const armVariants: Record<string, TargetAndTransition> = {
    wave: {
      rotate: [0, 20, -10, 20, 0],
      transition: { duration: 1.8, repeat: INF, repeatDelay: 2 },
    },
    point: {
      rotate: [-30],
      transition: { duration: 0.4 },
    },
    think: {
      rotate: [0, -15, 0],
      transition: { duration: 2, repeat: INF },
    },
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <svg
          width="120"
          height="140"
          viewBox="0 0 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
          role="img"
          aria-label="Synapse AI mascot robot"
        >
          <title>Synapse AI mascot robot</title>
          <ellipse
            cx="60"
            cy="135"
            rx="30"
            ry="6"
            fill="oklch(0.62 0.18 270 / 0.25)"
          />
          <rect
            x="25"
            y="68"
            width="70"
            height="52"
            rx="10"
            fill="oklch(0.22 0.02 260)"
            stroke="oklch(0.62 0.18 270 / 0.6)"
            strokeWidth="1.5"
          />
          <rect
            x="35"
            y="78"
            width="50"
            height="30"
            rx="6"
            fill="oklch(0.18 0.014 260)"
            stroke="oklch(0.62 0.18 270 / 0.3)"
            strokeWidth="1"
          />
          <circle cx="46" cy="91" r="4" fill="oklch(0.62 0.18 270)" />
          <motion.circle
            cx="60"
            cy="91"
            r="4"
            fill="oklch(0.7 0.17 162)"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: INF }}
          />
          <circle cx="74" cy="91" r="4" fill="oklch(0.65 0.25 16)" />
          <motion.g
            style={{ transformOrigin: "25px 80px" }}
            animate={armVariants[variant]}
          >
            <rect
              x="8"
              y="72"
              width="18"
              height="40"
              rx="9"
              fill="oklch(0.22 0.02 260)"
              stroke="oklch(0.62 0.18 270 / 0.4)"
              strokeWidth="1.5"
            />
            <circle
              cx="17"
              cy="114"
              r="8"
              fill="oklch(0.25 0.02 260)"
              stroke="oklch(0.62 0.18 270 / 0.4)"
              strokeWidth="1"
            />
          </motion.g>
          <rect
            x="94"
            y="72"
            width="18"
            height="40"
            rx="9"
            fill="oklch(0.22 0.02 260)"
            stroke="oklch(0.62 0.18 270 / 0.4)"
            strokeWidth="1.5"
          />
          <circle
            cx="103"
            cy="114"
            r="8"
            fill="oklch(0.25 0.02 260)"
            stroke="oklch(0.62 0.18 270 / 0.4)"
            strokeWidth="1"
          />
          <rect
            x="34"
            y="118"
            width="20"
            height="16"
            rx="4"
            fill="oklch(0.22 0.02 260)"
            stroke="oklch(0.62 0.18 270 / 0.3)"
            strokeWidth="1"
          />
          <rect
            x="66"
            y="118"
            width="20"
            height="16"
            rx="4"
            fill="oklch(0.22 0.02 260)"
            stroke="oklch(0.62 0.18 270 / 0.3)"
            strokeWidth="1"
          />
          <rect
            x="50"
            y="58"
            width="20"
            height="12"
            rx="4"
            fill="oklch(0.22 0.02 260)"
            stroke="oklch(0.62 0.18 270 / 0.4)"
            strokeWidth="1"
          />
          <rect
            x="18"
            y="14"
            width="84"
            height="48"
            rx="14"
            fill="oklch(0.22 0.02 260)"
            stroke="oklch(0.62 0.18 270 / 0.7)"
            strokeWidth="2"
          />
          <line
            x1="60"
            y1="14"
            x2="60"
            y2="4"
            stroke="oklch(0.62 0.18 270 / 0.8)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <motion.circle
            cx="60"
            cy="4"
            r="4"
            fill="oklch(0.62 0.18 270)"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: INF }}
          />
          <motion.rect
            x="32"
            y="26"
            width="20"
            height="16"
            rx="5"
            fill="oklch(0.62 0.18 270)"
            variants={eyeVariants}
            animate="blink"
          />
          <motion.rect
            x="68"
            y="26"
            width="20"
            height="16"
            rx="5"
            fill="oklch(0.62 0.18 270)"
            variants={eyeVariants}
            animate="blink"
          />
          <circle cx="42" cy="34" r="4" fill="oklch(0.145 0.014 260)" />
          <circle cx="78" cy="34" r="4" fill="oklch(0.145 0.014 260)" />
          <circle cx="43" cy="33" r="1.5" fill="white" opacity="0.8" />
          <circle cx="79" cy="33" r="1.5" fill="white" opacity="0.8" />
          <path
            d="M44 48 Q60 56 76 48"
            stroke="oklch(0.62 0.18 270)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        key={speech}
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative max-w-xs"
      >
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="w-4 h-4 rotate-45 -translate-y-2 rounded-sm"
            style={{
              background: "oklch(0.25 0.03 270)",
              border: "1px solid oklch(0.62 0.18 270 / 0.35)",
            }}
          />
        </div>
        <div
          className="px-4 py-3 rounded-xl text-sm text-center leading-relaxed font-body"
          style={{
            background: "oklch(0.25 0.03 270)",
            border: "1px solid oklch(0.62 0.18 270 / 0.35)",
            color: "oklch(0.9 0.01 260)",
            boxShadow: "0 4px 16px oklch(0.62 0.18 270 / 0.15)",
          }}
        >
          {speech}
        </div>
      </motion.div>
    </div>
  );
}
