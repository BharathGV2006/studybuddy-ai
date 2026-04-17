import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, a as cn, r as reactExports, P as Primitive, u as useNavigate, A as AnimatePresence, U as Users } from "./index-D-Ffb-dF.js";
import { B as Button } from "./button-DH7WpwP0.js";
import { A as ArrowLeft } from "./arrow-left-C8HGKXGO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
const INF = Number.POSITIVE_INFINITY;
function OnboardingMascot({
  speech,
  variant = "wave"
}) {
  const eyeVariants = {
    blink: {
      scaleY: [1, 0.1, 1],
      transition: { duration: 0.2, repeat: INF, repeatDelay: 3 }
    }
  };
  const armVariants = {
    wave: {
      rotate: [0, 20, -10, 20, 0],
      transition: { duration: 1.8, repeat: INF, repeatDelay: 2 }
    },
    point: {
      rotate: [-30],
      transition: { duration: 0.4 }
    },
    think: {
      rotate: [0, -15, 0],
      transition: { duration: 2, repeat: INF }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring", stiffness: 200, damping: 15 },
        className: "relative",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "120",
            height: "140",
            viewBox: "0 0 120 140",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "drop-shadow-lg",
            role: "img",
            "aria-label": "Synapse AI mascot robot",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Synapse AI mascot robot" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ellipse",
                {
                  cx: "60",
                  cy: "135",
                  rx: "30",
                  ry: "6",
                  fill: "oklch(0.62 0.18 270 / 0.25)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "25",
                  y: "68",
                  width: "70",
                  height: "52",
                  rx: "10",
                  fill: "oklch(0.22 0.02 260)",
                  stroke: "oklch(0.62 0.18 270 / 0.6)",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "35",
                  y: "78",
                  width: "50",
                  height: "30",
                  rx: "6",
                  fill: "oklch(0.18 0.014 260)",
                  stroke: "oklch(0.62 0.18 270 / 0.3)",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "46", cy: "91", r: "4", fill: "oklch(0.62 0.18 270)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.circle,
                {
                  cx: "60",
                  cy: "91",
                  r: "4",
                  fill: "oklch(0.7 0.17 162)",
                  animate: { opacity: [1, 0.3, 1] },
                  transition: { duration: 1.5, repeat: INF }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "74", cy: "91", r: "4", fill: "oklch(0.65 0.25 16)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.g,
                {
                  style: { transformOrigin: "25px 80px" },
                  animate: armVariants[variant],
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: "8",
                        y: "72",
                        width: "18",
                        height: "40",
                        rx: "9",
                        fill: "oklch(0.22 0.02 260)",
                        stroke: "oklch(0.62 0.18 270 / 0.4)",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        cx: "17",
                        cy: "114",
                        r: "8",
                        fill: "oklch(0.25 0.02 260)",
                        stroke: "oklch(0.62 0.18 270 / 0.4)",
                        strokeWidth: "1"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "94",
                  y: "72",
                  width: "18",
                  height: "40",
                  rx: "9",
                  fill: "oklch(0.22 0.02 260)",
                  stroke: "oklch(0.62 0.18 270 / 0.4)",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: "103",
                  cy: "114",
                  r: "8",
                  fill: "oklch(0.25 0.02 260)",
                  stroke: "oklch(0.62 0.18 270 / 0.4)",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "34",
                  y: "118",
                  width: "20",
                  height: "16",
                  rx: "4",
                  fill: "oklch(0.22 0.02 260)",
                  stroke: "oklch(0.62 0.18 270 / 0.3)",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "66",
                  y: "118",
                  width: "20",
                  height: "16",
                  rx: "4",
                  fill: "oklch(0.22 0.02 260)",
                  stroke: "oklch(0.62 0.18 270 / 0.3)",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "50",
                  y: "58",
                  width: "20",
                  height: "12",
                  rx: "4",
                  fill: "oklch(0.22 0.02 260)",
                  stroke: "oklch(0.62 0.18 270 / 0.4)",
                  strokeWidth: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "18",
                  y: "14",
                  width: "84",
                  height: "48",
                  rx: "14",
                  fill: "oklch(0.22 0.02 260)",
                  stroke: "oklch(0.62 0.18 270 / 0.7)",
                  strokeWidth: "2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "60",
                  y1: "14",
                  x2: "60",
                  y2: "4",
                  stroke: "oklch(0.62 0.18 270 / 0.8)",
                  strokeWidth: "2",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.circle,
                {
                  cx: "60",
                  cy: "4",
                  r: "4",
                  fill: "oklch(0.62 0.18 270)",
                  animate: { scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] },
                  transition: { duration: 1.5, repeat: INF }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.rect,
                {
                  x: "32",
                  y: "26",
                  width: "20",
                  height: "16",
                  rx: "5",
                  fill: "oklch(0.62 0.18 270)",
                  variants: eyeVariants,
                  animate: "blink"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.rect,
                {
                  x: "68",
                  y: "26",
                  width: "20",
                  height: "16",
                  rx: "5",
                  fill: "oklch(0.62 0.18 270)",
                  variants: eyeVariants,
                  animate: "blink"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "42", cy: "34", r: "4", fill: "oklch(0.145 0.014 260)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "78", cy: "34", r: "4", fill: "oklch(0.145 0.014 260)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "43", cy: "33", r: "1.5", fill: "white", opacity: "0.8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "79", cy: "33", r: "1.5", fill: "white", opacity: "0.8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M44 48 Q60 56 76 48",
                  stroke: "oklch(0.62 0.18 270)",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                  fill: "none"
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.25, ease: "easeOut" },
        className: "relative max-w-xs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-4 h-4 rotate-45 -translate-y-2 rounded-sm",
                  style: {
                    background: "oklch(0.25 0.03 270)",
                    border: "1px solid oklch(0.62 0.18 270 / 0.35)"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "px-4 py-3 rounded-xl text-sm text-center leading-relaxed font-body",
              style: {
                background: "oklch(0.25 0.03 270)",
                border: "1px solid oklch(0.62 0.18 270 / 0.35)",
                color: "oklch(0.9 0.01 260)",
                boxShadow: "0 4px 16px oklch(0.62 0.18 270 / 0.15)"
              },
              children: speech
            }
          )
        ]
      },
      speech
    )
  ] });
}
function StepIndicator({
  currentStep,
  totalSteps,
  labels = []
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center",
      "aria-label": `Step ${currentStep} of ${totalSteps}`,
      children: Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              animate: isActive ? { scale: [1, 1.12, 1] } : { scale: 1 },
              transition: isActive ? { duration: 0.4, ease: "easeOut" } : {},
              className: "relative flex items-center justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold font-display transition-smooth",
                    style: isDone ? {
                      background: "oklch(0.62 0.18 270)",
                      color: "oklch(0.145 0.014 270)",
                      boxShadow: "0 0 12px oklch(0.62 0.18 270 / 0.4)"
                    } : isActive ? {
                      background: "oklch(0.62 0.18 270)",
                      color: "oklch(0.145 0.014 270)",
                      boxShadow: "0 0 18px oklch(0.62 0.18 270 / 0.55)"
                    } : {
                      background: "oklch(0.22 0.02 260)",
                      color: "oklch(0.55 0.01 260)",
                      border: "1.5px solid oklch(0.28 0.02 260)"
                    },
                    children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4", strokeWidth: 2.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stepNum })
                  }
                ),
                isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "absolute inset-0 rounded-full pointer-events-none",
                    style: { border: "2px solid oklch(0.62 0.18 270 / 0.45)" },
                    animate: { scale: [1, 1.55], opacity: [0.6, 0] },
                    transition: {
                      duration: 1.4,
                      repeat: Number.POSITIVE_INFINITY
                    }
                  }
                )
              ]
            }
          ),
          labels[i] && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute mt-12 text-xs whitespace-nowrap hidden sm:block",
              style: {
                color: isActive ? "oklch(0.62 0.18 270)" : isDone ? "oklch(0.75 0.01 260)" : "oklch(0.45 0.01 260)",
                fontFamily: "var(--font-display)"
              },
              children: labels[i]
            }
          ),
          stepNum < totalSteps && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 sm:w-24 h-0.5 mx-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 rounded-full",
                style: { background: "oklch(0.28 0.02 260)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-0 rounded-full origin-left",
                style: { background: "oklch(0.62 0.18 270)" },
                animate: { scaleX: isDone ? 1 : 0 },
                transition: { duration: 0.35, ease: "easeInOut" }
              }
            )
          ] })
        ] }, stepNum);
      })
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const ONBOARDING_KEY = "synapse_onboarding_complete";
const STUDY_GOALS = [
  { id: "algorithms", emoji: "🧮", label: "Data Structures & Algorithms" },
  { id: "ml", emoji: "🤖", label: "Machine Learning & AI" },
  { id: "webdev", emoji: "🌐", label: "Web Development" },
  { id: "math", emoji: "📐", label: "Mathematics & Calculus" },
  { id: "interviews", emoji: "💼", label: "Technical Interviews" },
  { id: "research", emoji: "🔬", label: "Academic Research" },
  { id: "languages", emoji: "💬", label: "Programming Languages" },
  { id: "systems", emoji: "⚙️", label: "Systems Design" }
];
const MOCK_ROOMS = [
  {
    id: "r1",
    name: "Advanced JS Workshop",
    members: 4,
    subject: "Computer Science",
    active: true
  },
  {
    id: "r2",
    name: "ML Paper Review",
    members: 2,
    subject: "Artificial Intelligence",
    active: true
  },
  {
    id: "r3",
    name: "Calc Study Group",
    members: 6,
    subject: "Mathematics",
    active: false
  }
];
const STEP_LABELS = ["Welcome", "Sync Syllabi", "Study Room"];
const mascotSpeeches = [
  "Hi there! I'm Synapse, your AI study buddy. Let's set up your perfect learning environment! 🚀",
  "Great! Now let me sync your course materials. This usually takes just a moment… ⚡",
  "Almost there! Join an existing study room or create your own to collaborate with peers. 🎉"
];
function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(1);
  const [name, setName] = reactExports.useState("");
  const [selectedGoals, setSelectedGoals] = reactExports.useState([]);
  const [syncProgress, setSyncProgress] = reactExports.useState(0);
  const [syncDone, setSyncDone] = reactExports.useState(false);
  const [roomMode, setRoomMode] = reactExports.useState("join");
  const [newRoomName, setNewRoomName] = reactExports.useState("");
  const [selectedRoom, setSelectedRoom] = reactExports.useState(null);
  const syncTimer = reactExports.useRef(null);
  const progressTimer = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (localStorage.getItem(ONBOARDING_KEY) === "true") {
      void navigate({ to: "/dashboard" });
    }
  }, [navigate]);
  reactExports.useEffect(() => {
    if (step !== 2) return;
    setSyncProgress(0);
    setSyncDone(false);
    progressTimer.current = setInterval(() => {
      setSyncProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer.current);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    syncTimer.current = setTimeout(() => {
      setSyncDone(true);
    }, 2200);
    return () => {
      clearInterval(progressTimer.current);
      clearTimeout(syncTimer.current);
    };
  }, [step]);
  const toggleGoal = (id) => {
    setSelectedGoals(
      (prev) => prev.includes(id) ? prev.filter((g) => g !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };
  const canNext = step === 1 ? name.trim().length > 0 && selectedGoals.length >= 2 : step === 2 ? syncDone : step === 3 ? roomMode === "join" ? selectedRoom !== null : newRoomName.trim().length > 0 : false;
  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      localStorage.setItem(ONBOARDING_KEY, "true");
      void navigate({ to: "/dashboard" });
    }
  };
  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center relative overflow-hidden",
      style: { background: "oklch(0.12 0.018 260)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30",
              style: {
                background: "radial-gradient(circle, oklch(0.62 0.18 270 / 0.5), transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20",
              style: {
                background: "radial-gradient(circle, oklch(0.55 0.15 300 / 0.4), transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-15",
              style: {
                background: "radial-gradient(circle, oklch(0.5 0.2 220 / 0.4), transparent 70%)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.4, ease: "easeOut" },
            className: "relative z-10 w-full max-w-lg mx-4",
            "data-ocid": "onboarding.card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl p-8",
                style: {
                  background: "oklch(0.18 0.014 260 / 0.75)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid oklch(0.62 0.18 270 / 0.18)",
                  boxShadow: "0 24px 64px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0.62 0.18 270 / 0.08)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex justify-center mb-8",
                      "data-ocid": "onboarding.step_indicator",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        StepIndicator,
                        {
                          currentStep: step,
                          totalSteps: 3,
                          labels: STEP_LABELS
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    OnboardingMascot,
                    {
                      speech: mascotSpeeches[step - 1],
                      variant: step === 1 ? "wave" : step === 2 ? "think" : "point"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, x: 20 },
                      animate: { opacity: 1, x: 0 },
                      exit: { opacity: 0, x: -20 },
                      transition: { duration: 0.2, ease: "easeOut" },
                      children: [
                        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Step1,
                          {
                            name,
                            onNameChange: setName,
                            selectedGoals,
                            onToggleGoal: toggleGoal
                          }
                        ),
                        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step2, { progress: syncProgress, done: syncDone }),
                        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Step3,
                          {
                            roomMode,
                            onRoomModeChange: setRoomMode,
                            selectedRoom,
                            onSelectRoom: setSelectedRoom,
                            newRoomName,
                            onNewRoomNameChange: setNewRoomName
                          }
                        )
                      ]
                    },
                    step
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-8 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        onClick: handleBack,
                        disabled: step === 1,
                        className: "transition-smooth",
                        "data-ocid": "onboarding.back_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                          "Back"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        onClick: handleNext,
                        disabled: !canNext,
                        className: "flex-1 max-w-[200px] transition-smooth font-display font-semibold",
                        style: canNext ? {
                          background: "oklch(0.62 0.18 270)",
                          color: "oklch(0.145 0.014 270)",
                          boxShadow: "0 4px 16px oklch(0.62 0.18 270 / 0.35)"
                        } : {},
                        "data-ocid": step === 3 ? "onboarding.finish_button" : "onboarding.next_button",
                        children: step === 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          "Finish Setup",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 ml-2" })
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          "Continue",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                        ] })
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function Step1({
  name,
  onNameChange,
  selectedGoals,
  onToggleGoal
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Create Your Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Tell us about yourself to personalise your learning journey" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "onboarding-name",
          className: "font-display text-sm font-medium text-foreground",
          children: "Your name"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "onboarding-name",
          type: "text",
          placeholder: "e.g. Alex Chen",
          value: name,
          onChange: (e) => onNameChange(e.target.value),
          className: "bg-card/50 border-border/60 focus:border-primary",
          "data-ocid": "onboarding.name_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display text-sm font-medium text-foreground", children: "Study goals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-xs",
            style: {
              color: selectedGoals.length >= 3 ? "oklch(0.62 0.18 270)" : "oklch(0.55 0.01 260)"
            },
            children: [
              selectedGoals.length,
              "/3 selected (min 2)"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 gap-2",
          "data-ocid": "onboarding.goals_list",
          children: STUDY_GOALS.map((goal, idx) => {
            const isSelected = selectedGoals.includes(goal.id);
            const isDisabled = !isSelected && selectedGoals.length >= 3;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => !isDisabled && onToggleGoal(goal.id),
                disabled: isDisabled,
                "aria-pressed": isSelected,
                "data-ocid": `onboarding.goal.${idx + 1}`,
                className: "flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm transition-smooth cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
                style: isSelected ? {
                  background: "oklch(0.62 0.18 270 / 0.18)",
                  border: "1px solid oklch(0.62 0.18 270 / 0.5)",
                  color: "oklch(0.9 0.01 260)",
                  boxShadow: "0 0 8px oklch(0.62 0.18 270 / 0.12)"
                } : {
                  background: "oklch(0.22 0.02 260 / 0.6)",
                  border: "1px solid oklch(0.28 0.02 260)",
                  color: "oklch(0.7 0.01 260)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: goal.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body leading-tight", children: goal.label }),
                  isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Check,
                    {
                      className: "w-3.5 h-3.5 ml-auto shrink-0",
                      style: { color: "oklch(0.62 0.18 270)" }
                    }
                  )
                ]
              },
              goal.id
            );
          })
        }
      )
    ] })
  ] });
}
const SYNC_ITEMS = [
  "Computer Science 301 — Algorithms",
  "Mathematics 202 — Calculus II",
  "AI-501 — Machine Learning",
  "Physics 101 — Mechanics"
];
function Step2({ progress, done }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Syncing Your Syllabi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Importing course materials to personalise your AI tutor" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "onboarding.sync_progress", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex justify-between text-xs",
          style: { color: "oklch(0.55 0.01 260)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: "Syncing courses…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              progress,
              "%"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-2 rounded-full overflow-hidden",
          style: { background: "oklch(0.22 0.02 260)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full",
              style: {
                background: "linear-gradient(90deg, oklch(0.62 0.18 270), oklch(0.55 0.15 300))",
                boxShadow: "0 0 8px oklch(0.62 0.18 270 / 0.5)"
              },
              animate: { width: `${progress}%` },
              transition: { ease: "easeOut", duration: 0.1 }
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: SYNC_ITEMS.map((item, idx) => {
      const itemProgress = idx * 25;
      const visible = progress >= itemProgress;
      const complete = progress >= itemProgress + 25;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -12 },
          animate: visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 },
          transition: { duration: 0.3 },
          className: "flex items-center gap-3 px-3 py-2 rounded-lg",
          style: { background: "oklch(0.22 0.02 260 / 0.6)" },
          "data-ocid": `onboarding.sync_item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-smooth",
                style: complete ? {
                  background: "oklch(0.7 0.17 162)",
                  boxShadow: "0 0 6px oklch(0.7 0.17 162 / 0.4)"
                } : visible ? { border: "2px solid oklch(0.62 0.18 270)" } : { border: "2px solid oklch(0.28 0.02 260)" },
                children: [
                  complete && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Check,
                    {
                      className: "w-3 h-3",
                      style: { color: "oklch(0.145 0.014 260)" }
                    }
                  ),
                  !complete && visible && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "w-2 h-2 rounded-full",
                      style: { background: "oklch(0.62 0.18 270)" },
                      animate: { scale: [1, 0.5, 1] },
                      transition: {
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY
                      }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-sm font-body",
                style: {
                  color: complete ? "oklch(0.85 0.01 260)" : "oklch(0.6 0.01 260)"
                },
                children: item
              }
            )
          ]
        },
        item
      );
    }) }),
    done && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center py-3 rounded-xl font-display text-sm font-semibold",
        style: {
          background: "oklch(0.7 0.17 162 / 0.12)",
          border: "1px solid oklch(0.7 0.17 162 / 0.35)",
          color: "oklch(0.7 0.17 162)"
        },
        "data-ocid": "onboarding.sync_complete",
        children: "✅ All courses synced successfully!"
      }
    )
  ] });
}
function Step3({
  roomMode,
  onRoomModeChange,
  selectedRoom,
  onSelectRoom,
  newRoomName,
  onNewRoomNameChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Join a Study Room" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Collaborate in real-time with peers who share your interests" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 p-1 rounded-xl",
        style: { background: "oklch(0.22 0.02 260)" },
        "data-ocid": "onboarding.room_mode_toggle",
        children: ["join", "create"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onRoomModeChange(mode),
            "aria-pressed": roomMode === mode,
            "data-ocid": `onboarding.room_mode.${mode}`,
            className: "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-display font-medium transition-smooth",
            style: roomMode === mode ? {
              background: "oklch(0.62 0.18 270)",
              color: "oklch(0.145 0.014 270)",
              boxShadow: "0 2px 8px oklch(0.62 0.18 270 / 0.3)"
            } : { color: "oklch(0.6 0.01 260)" },
            children: mode === "join" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              " Join Room"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              " Create New"
            ] })
          },
          mode
        ))
      }
    ),
    roomMode === "join" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "onboarding.room_list", children: MOCK_ROOMS.map((room, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onSelectRoom(room.id),
        "data-ocid": `onboarding.room.${idx + 1}`,
        className: "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-smooth",
        style: selectedRoom === room.id ? {
          background: "oklch(0.62 0.18 270 / 0.15)",
          border: "1px solid oklch(0.62 0.18 270 / 0.5)",
          boxShadow: "0 0 12px oklch(0.62 0.18 270 / 0.1)"
        } : {
          background: "oklch(0.22 0.02 260 / 0.6)",
          border: "1px solid oklch(0.28 0.02 260)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-medium text-sm text-foreground truncate", children: room.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-xs mt-0.5",
                style: { color: "oklch(0.55 0.01 260)" },
                children: [
                  room.subject,
                  " · ",
                  room.members,
                  " members"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 ml-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-2 h-2 rounded-full",
                style: {
                  background: room.active ? "oklch(0.7 0.17 162)" : "oklch(0.45 0.01 260)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs",
                style: {
                  color: room.active ? "oklch(0.7 0.17 162)" : "oklch(0.45 0.01 260)"
                },
                children: room.active ? "Active" : "Idle"
              }
            ),
            selectedRoom === room.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Check,
              {
                className: "w-4 h-4",
                style: { color: "oklch(0.62 0.18 270)" }
              }
            )
          ] })
        ]
      },
      room.id
    )) }),
    roomMode === "create" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "new-room-name",
          className: "font-display text-sm font-medium text-foreground",
          children: "Room name"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "new-room-name",
          type: "text",
          placeholder: "e.g. Deep Learning Study Group",
          value: newRoomName,
          onChange: (e) => onNewRoomNameChange(e.target.value),
          className: "bg-card/50 border-border/60 focus:border-primary",
          "data-ocid": "onboarding.new_room_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.5 0.01 260)" }, children: "You'll be the host and can invite others after setup" })
    ] })
  ] });
}
export {
  Onboarding as default
};
