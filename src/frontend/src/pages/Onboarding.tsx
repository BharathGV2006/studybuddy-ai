import { OnboardingMascot } from "@/components/OnboardingMascot";
import { StepIndicator } from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Plus, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ONBOARDING_KEY = "synapse_onboarding_complete";

const STUDY_GOALS = [
  { id: "algorithms", emoji: "🧮", label: "Data Structures & Algorithms" },
  { id: "ml", emoji: "🤖", label: "Machine Learning & AI" },
  { id: "webdev", emoji: "🌐", label: "Web Development" },
  { id: "math", emoji: "📐", label: "Mathematics & Calculus" },
  { id: "interviews", emoji: "💼", label: "Technical Interviews" },
  { id: "research", emoji: "🔬", label: "Academic Research" },
  { id: "languages", emoji: "💬", label: "Programming Languages" },
  { id: "systems", emoji: "⚙️", label: "Systems Design" },
];

const MOCK_ROOMS = [
  {
    id: "r1",
    name: "Advanced JS Workshop",
    members: 4,
    subject: "Computer Science",
    active: true,
  },
  {
    id: "r2",
    name: "ML Paper Review",
    members: 2,
    subject: "Artificial Intelligence",
    active: true,
  },
  {
    id: "r3",
    name: "Calc Study Group",
    members: 6,
    subject: "Mathematics",
    active: false,
  },
];

const STEP_LABELS = ["Welcome", "Sync Syllabi", "Study Room"];

const mascotSpeeches = [
  "Hi there! I'm Synapse, your AI study buddy. Let's set up your perfect learning environment! 🚀",
  "Great! Now let me sync your course materials. This usually takes just a moment… ⚡",
  "Almost there! Join an existing study room or create your own to collaborate with peers. 🎉",
];

type RoomMode = "join" | "create";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncDone, setSyncDone] = useState(false);
  const [roomMode, setRoomMode] = useState<RoomMode>("join");
  const [newRoomName, setNewRoomName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    if (localStorage.getItem(ONBOARDING_KEY) === "true") {
      void navigate({ to: "/dashboard" });
    }
  }, [navigate]);

  // Animate sync progress on step 2
  useEffect(() => {
    if (step !== 2) return;
    setSyncProgress(0);
    setSyncDone(false);

    progressTimer.current = setInterval(() => {
      setSyncProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer.current!);
          return 100;
        }
        return p + 2;
      });
    }, 40);

    syncTimer.current = setTimeout(() => {
      setSyncDone(true);
    }, 2200);

    return () => {
      clearInterval(progressTimer.current!);
      clearTimeout(syncTimer.current!);
    };
  }, [step]);

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id)
        ? prev.filter((g) => g !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev,
    );
  };

  const canNext =
    step === 1
      ? name.trim().length > 0 && selectedGoals.length >= 2
      : step === 2
        ? syncDone
        : step === 3
          ? roomMode === "join"
            ? selectedRoom !== null
            : newRoomName.trim().length > 0
          : false;

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

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(0.12 0.018 260)" }}
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.18 270 / 0.5), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.15 300 / 0.4), transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(0.5 0.2 220 / 0.4), transparent 70%)",
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg mx-4"
        data-ocid="onboarding.card"
      >
        <div
          className="rounded-2xl p-8"
          style={{
            background: "oklch(0.18 0.014 260 / 0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid oklch(0.62 0.18 270 / 0.18)",
            boxShadow:
              "0 24px 64px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0.62 0.18 270 / 0.08)",
          }}
        >
          {/* Step indicator */}
          <div
            className="flex justify-center mb-8"
            data-ocid="onboarding.step_indicator"
          >
            <StepIndicator
              currentStep={step}
              totalSteps={3}
              labels={STEP_LABELS}
            />
          </div>

          {/* Mascot */}
          <div className="flex justify-center mb-6">
            <OnboardingMascot
              speech={mascotSpeeches[step - 1]}
              variant={step === 1 ? "wave" : step === 2 ? "think" : "point"}
            />
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {step === 1 && (
                <Step1
                  name={name}
                  onNameChange={setName}
                  selectedGoals={selectedGoals}
                  onToggleGoal={toggleGoal}
                />
              )}
              {step === 2 && <Step2 progress={syncProgress} done={syncDone} />}
              {step === 3 && (
                <Step3
                  roomMode={roomMode}
                  onRoomModeChange={setRoomMode}
                  selectedRoom={selectedRoom}
                  onSelectRoom={setSelectedRoom}
                  newRoomName={newRoomName}
                  onNewRoomNameChange={setNewRoomName}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className="transition-smooth"
              data-ocid="onboarding.back_button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              className="flex-1 max-w-[200px] transition-smooth font-display font-semibold"
              style={
                canNext
                  ? {
                      background: "oklch(0.62 0.18 270)",
                      color: "oklch(0.145 0.014 270)",
                      boxShadow: "0 4px 16px oklch(0.62 0.18 270 / 0.35)",
                    }
                  : {}
              }
              data-ocid={
                step === 3
                  ? "onboarding.finish_button"
                  : "onboarding.next_button"
              }
            >
              {step === 3 ? (
                <>
                  Finish Setup
                  <Check className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Step 1: Profile ─── */
interface Step1Props {
  name: string;
  onNameChange: (v: string) => void;
  selectedGoals: string[];
  onToggleGoal: (id: string) => void;
}

function Step1({
  name,
  onNameChange,
  selectedGoals,
  onToggleGoal,
}: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Create Your Profile
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Tell us about yourself to personalise your learning journey
        </p>
      </div>

      {/* Name field */}
      <div className="space-y-2">
        <Label
          htmlFor="onboarding-name"
          className="font-display text-sm font-medium text-foreground"
        >
          Your name
        </Label>
        <Input
          id="onboarding-name"
          type="text"
          placeholder="e.g. Alex Chen"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="bg-card/50 border-border/60 focus:border-primary"
          data-ocid="onboarding.name_input"
        />
      </div>

      {/* Goals */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="font-display text-sm font-medium text-foreground">
            Study goals
          </Label>
          <span
            className="text-xs"
            style={{
              color:
                selectedGoals.length >= 3
                  ? "oklch(0.62 0.18 270)"
                  : "oklch(0.55 0.01 260)",
            }}
          >
            {selectedGoals.length}/3 selected (min 2)
          </span>
        </div>
        <div
          className="grid grid-cols-2 gap-2"
          data-ocid="onboarding.goals_list"
        >
          {STUDY_GOALS.map((goal, idx) => {
            const isSelected = selectedGoals.includes(goal.id);
            const isDisabled = !isSelected && selectedGoals.length >= 3;
            return (
              <button
                type="button"
                key={goal.id}
                onClick={() => !isDisabled && onToggleGoal(goal.id)}
                disabled={isDisabled}
                aria-pressed={isSelected}
                data-ocid={`onboarding.goal.${idx + 1}`}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm transition-smooth cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={
                  isSelected
                    ? {
                        background: "oklch(0.62 0.18 270 / 0.18)",
                        border: "1px solid oklch(0.62 0.18 270 / 0.5)",
                        color: "oklch(0.9 0.01 260)",
                        boxShadow: "0 0 8px oklch(0.62 0.18 270 / 0.12)",
                      }
                    : {
                        background: "oklch(0.22 0.02 260 / 0.6)",
                        border: "1px solid oklch(0.28 0.02 260)",
                        color: "oklch(0.7 0.01 260)",
                      }
                }
              >
                <span className="text-base leading-none">{goal.emoji}</span>
                <span className="font-body leading-tight">{goal.label}</span>
                {isSelected && (
                  <Check
                    className="w-3.5 h-3.5 ml-auto shrink-0"
                    style={{ color: "oklch(0.62 0.18 270)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Sync ─── */
interface Step2Props {
  progress: number;
  done: boolean;
}

const SYNC_ITEMS = [
  "Computer Science 301 — Algorithms",
  "Mathematics 202 — Calculus II",
  "AI-501 — Machine Learning",
  "Physics 101 — Mechanics",
];

function Step2({ progress, done }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Syncing Your Syllabi
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Importing course materials to personalise your AI tutor
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2" data-ocid="onboarding.sync_progress">
        <div
          className="flex justify-between text-xs"
          style={{ color: "oklch(0.55 0.01 260)" }}
        >
          <span className="font-display">Syncing courses…</span>
          <span className="font-mono">{progress}%</span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "oklch(0.22 0.02 260)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.62 0.18 270), oklch(0.55 0.15 300))",
              boxShadow: "0 0 8px oklch(0.62 0.18 270 / 0.5)",
            }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.1 }}
          />
        </div>
      </div>

      {/* Course list */}
      <div className="space-y-2">
        {SYNC_ITEMS.map((item, idx) => {
          const itemProgress = idx * 25;
          const visible = progress >= itemProgress;
          const complete = progress >= itemProgress + 25;
          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg"
              style={{ background: "oklch(0.22 0.02 260 / 0.6)" }}
              data-ocid={`onboarding.sync_item.${idx + 1}`}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-smooth"
                style={
                  complete
                    ? {
                        background: "oklch(0.7 0.17 162)",
                        boxShadow: "0 0 6px oklch(0.7 0.17 162 / 0.4)",
                      }
                    : visible
                      ? { border: "2px solid oklch(0.62 0.18 270)" }
                      : { border: "2px solid oklch(0.28 0.02 260)" }
                }
              >
                {complete && (
                  <Check
                    className="w-3 h-3"
                    style={{ color: "oklch(0.145 0.014 260)" }}
                  />
                )}
                {!complete && visible && (
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "oklch(0.62 0.18 270)" }}
                    animate={{ scale: [1, 0.5, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                )}
              </div>
              <span
                className="text-sm font-body"
                style={{
                  color: complete
                    ? "oklch(0.85 0.01 260)"
                    : "oklch(0.6 0.01 260)",
                }}
              >
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-3 rounded-xl font-display text-sm font-semibold"
          style={{
            background: "oklch(0.7 0.17 162 / 0.12)",
            border: "1px solid oklch(0.7 0.17 162 / 0.35)",
            color: "oklch(0.7 0.17 162)",
          }}
          data-ocid="onboarding.sync_complete"
        >
          ✅ All courses synced successfully!
        </motion.div>
      )}
    </div>
  );
}

/* ─── Step 3: Study Room ─── */
interface Step3Props {
  roomMode: RoomMode;
  onRoomModeChange: (m: RoomMode) => void;
  selectedRoom: string | null;
  onSelectRoom: (id: string) => void;
  newRoomName: string;
  onNewRoomNameChange: (v: string) => void;
}

function Step3({
  roomMode,
  onRoomModeChange,
  selectedRoom,
  onSelectRoom,
  newRoomName,
  onNewRoomNameChange,
}: Step3Props) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Join a Study Room
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Collaborate in real-time with peers who share your interests
        </p>
      </div>

      {/* Mode toggle */}
      <div
        className="flex gap-2 p-1 rounded-xl"
        style={{ background: "oklch(0.22 0.02 260)" }}
        data-ocid="onboarding.room_mode_toggle"
      >
        {(["join", "create"] as RoomMode[]).map((mode) => (
          <button
            type="button"
            key={mode}
            onClick={() => onRoomModeChange(mode)}
            aria-pressed={roomMode === mode}
            data-ocid={`onboarding.room_mode.${mode}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-display font-medium transition-smooth"
            style={
              roomMode === mode
                ? {
                    background: "oklch(0.62 0.18 270)",
                    color: "oklch(0.145 0.014 270)",
                    boxShadow: "0 2px 8px oklch(0.62 0.18 270 / 0.3)",
                  }
                : { color: "oklch(0.6 0.01 260)" }
            }
          >
            {mode === "join" ? (
              <>
                <Users className="w-4 h-4" /> Join Room
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Create New
              </>
            )}
          </button>
        ))}
      </div>

      {/* Join mode */}
      {roomMode === "join" && (
        <div className="space-y-2" data-ocid="onboarding.room_list">
          {MOCK_ROOMS.map((room, idx) => (
            <button
              type="button"
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              data-ocid={`onboarding.room.${idx + 1}`}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-smooth"
              style={
                selectedRoom === room.id
                  ? {
                      background: "oklch(0.62 0.18 270 / 0.15)",
                      border: "1px solid oklch(0.62 0.18 270 / 0.5)",
                      boxShadow: "0 0 12px oklch(0.62 0.18 270 / 0.1)",
                    }
                  : {
                      background: "oklch(0.22 0.02 260 / 0.6)",
                      border: "1px solid oklch(0.28 0.02 260)",
                    }
              }
            >
              <div className="min-w-0">
                <p className="font-display font-medium text-sm text-foreground truncate">
                  {room.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.55 0.01 260)" }}
                >
                  {room.subject} · {room.members} members
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: room.active
                      ? "oklch(0.7 0.17 162)"
                      : "oklch(0.45 0.01 260)",
                  }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: room.active
                      ? "oklch(0.7 0.17 162)"
                      : "oklch(0.45 0.01 260)",
                  }}
                >
                  {room.active ? "Active" : "Idle"}
                </span>
                {selectedRoom === room.id && (
                  <Check
                    className="w-4 h-4"
                    style={{ color: "oklch(0.62 0.18 270)" }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Create mode */}
      {roomMode === "create" && (
        <div className="space-y-2">
          <Label
            htmlFor="new-room-name"
            className="font-display text-sm font-medium text-foreground"
          >
            Room name
          </Label>
          <Input
            id="new-room-name"
            type="text"
            placeholder="e.g. Deep Learning Study Group"
            value={newRoomName}
            onChange={(e) => onNewRoomNameChange(e.target.value)}
            className="bg-card/50 border-border/60 focus:border-primary"
            data-ocid="onboarding.new_room_input"
          />
          <p className="text-xs" style={{ color: "oklch(0.5 0.01 260)" }}>
            You'll be the host and can invite others after setup
          </p>
        </div>
      )}
    </div>
  );
}
