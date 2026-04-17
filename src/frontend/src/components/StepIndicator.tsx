import { Check } from "lucide-react";
import { motion } from "motion/react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function StepIndicator({
  currentStep,
  totalSteps,
  labels = [],
}: StepIndicatorProps) {
  return (
    <div
      className="flex items-center"
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={stepNum} className="flex items-center">
            {/* Step circle */}
            <motion.div
              animate={isActive ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={isActive ? { duration: 0.4, ease: "easeOut" } : {}}
              className="relative flex items-center justify-center"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold font-display transition-smooth"
                style={
                  isDone
                    ? {
                        background: "oklch(0.62 0.18 270)",
                        color: "oklch(0.145 0.014 270)",
                        boxShadow: "0 0 12px oklch(0.62 0.18 270 / 0.4)",
                      }
                    : isActive
                      ? {
                          background: "oklch(0.62 0.18 270)",
                          color: "oklch(0.145 0.014 270)",
                          boxShadow: "0 0 18px oklch(0.62 0.18 270 / 0.55)",
                        }
                      : {
                          background: "oklch(0.22 0.02 260)",
                          color: "oklch(0.55 0.01 260)",
                          border: "1.5px solid oklch(0.28 0.02 260)",
                        }
                }
              >
                {isDone ? (
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>

              {/* Active pulse ring */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ border: "2px solid oklch(0.62 0.18 270 / 0.45)" }}
                  animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              )}
            </motion.div>

            {/* Label (hidden on mobile) */}
            {labels[i] && (
              <span
                className="absolute mt-12 text-xs whitespace-nowrap hidden sm:block"
                style={{
                  color: isActive
                    ? "oklch(0.62 0.18 270)"
                    : isDone
                      ? "oklch(0.75 0.01 260)"
                      : "oklch(0.45 0.01 260)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {labels[i]}
              </span>
            )}

            {/* Connector line */}
            {stepNum < totalSteps && (
              <div className="relative w-16 sm:w-24 h-0.5 mx-1">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "oklch(0.28 0.02 260)" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full origin-left"
                  style={{ background: "oklch(0.62 0.18 270)" }}
                  animate={{ scaleX: isDone ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
