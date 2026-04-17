import { useEffect, useRef } from "react";

interface ProgressRingProps {
  current: number;
  goal: number;
  unit?: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressRing({
  current,
  goal,
  unit = "hrs",
  size = 200,
  strokeWidth = 14,
  label = "Daily Goal",
}: ProgressRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(current / goal, 1);
  const offset = circumference - progress * circumference;
  const percentage = Math.round(progress * 100);
  const cx = size / 2;
  const cy = size / 2;

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;
    // Animate from full offset (empty) to computed offset
    circle.style.strokeDashoffset = String(circumference);
    const raf = requestAnimationFrame(() => {
      circle.style.transition =
        "stroke-dashoffset 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      circle.style.strokeDashoffset = String(offset);
    });
    return () => cancelAnimationFrame(raf);
  }, [circumference, offset]);

  return (
    <div
      className="flex flex-col items-center gap-3"
      data-ocid="analytics.progress_ring"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          aria-label={`${percentage}% of daily study goal reached`}
          role="img"
        >
          <title>{`${percentage}% of daily study goal reached`}</title>
          {/* Track circle */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="oklch(0.22 0.02 260)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Indigo glow behind progress arc */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="oklch(0.62 0.18 270 / 0.15)"
            strokeWidth={strokeWidth + 6}
            strokeLinecap="round"
            strokeDasharray={`${circumference * progress} ${circumference}`}
            strokeDashoffset={0}
            style={{ filter: "blur(6px)" }}
          />
          {/* Progress arc */}
          <circle
            ref={circleRef}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="oklch(0.62 0.18 270)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              filter: "drop-shadow(0 0 8px oklch(0.62 0.18 270 / 0.6))",
            }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
          <span
            className="font-display font-bold text-foreground"
            style={{ fontSize: size * 0.17 }}
          >
            {percentage}%
          </span>
          <span
            className="text-muted-foreground font-body"
            style={{ fontSize: size * 0.085 }}
          >
            {current.toFixed(1)}
            <span className="opacity-60">
              {" "}
              / {goal}
              {unit}
            </span>
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-display font-semibold text-foreground text-sm">
          {label}
        </p>
        <p className="text-muted-foreground text-xs mt-0.5">
          {progress >= 1
            ? "🎉 Goal reached!"
            : `${(goal - current).toFixed(1)} ${unit} remaining`}
        </p>
      </div>
    </div>
  );
}
