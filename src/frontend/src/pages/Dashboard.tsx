import { cn } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  Flame,
  Layers,
  Pin,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ActivityFeed, { type ActivityItem } from "../components/ActivityFeed";
import AiTutorSidebar, { AiTutorToggle } from "../components/AiTutorSidebar";
import { QuizModal } from "../components/QuizModal";
import StatCard from "../components/StatCard";
import {
  mockStudySets,
  mockUserProfile,
  recentActivity,
} from "../data/mockData";
import type { StudySet } from "../types";

const QUICK_STATS = [
  {
    label: "Hours Today",
    value: "4.5",
    icon: Clock,
    trend: "+1.2h vs yesterday",
    trendUp: true,
    ocid: "stat.hours_today",
  },
  {
    label: "Current Streak",
    value: "12",
    icon: Flame,
    trend: "Personal best!",
    trendUp: true,
    ocid: "stat.streak",
  },
  {
    label: "Study Sets",
    value: mockStudySets.length,
    icon: BookOpen,
    trend: "+1 this week",
    trendUp: true,
    ocid: "stat.study_sets",
  },
  {
    label: "Cards Due",
    value: "24",
    icon: Layers,
    trend: "Review now",
    trendUp: false,
    ocid: "stat.cards_due",
  },
];

const PINNED_RESOURCES = mockStudySets.slice(0, 3);

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedQuizSet, setSelectedQuizSet] = useState<StudySet | null>(null);

  const firstName = mockUserProfile.name.split(" ")[0];
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div
      className={cn(
        "flex min-h-full transition-smooth",
        sidebarOpen ? "mr-[320px]" : "",
      )}
      data-ocid="dashboard.page"
    >
      {/* Main content */}
      <div className="flex-1 px-5 py-6 max-w-5xl mx-auto w-full">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start justify-between mb-6 gap-3"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {greeting}, {firstName} 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              You're on a{" "}
              <span
                className="font-semibold"
                style={{ color: "oklch(0.78 0.17 70)" }}
              >
                12-day streak
              </span>
              . Keep it going!
            </p>
          </div>

          {/* AI Tutor toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <AiTutorToggle
              open={sidebarOpen}
              onClick={() => setSidebarOpen((v) => !v)}
            />
          </div>
        </motion.div>

        {/* Quick stats row */}
        <section aria-label="Quick stats" className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                trendUp={stat.trendUp}
                delay={i * 0.06}
                ocid={stat.ocid}
              />
            ))}
          </div>
        </section>

        {/* Lower grid: Activity + Pinned */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Recent Activity — 3/5 */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            aria-label="Recent activity"
            className="lg:col-span-3"
          >
            <div className="surface-elevated rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <TrendingUp
                    size={16}
                    style={{ color: "oklch(0.72 0.18 270)" }}
                  />
                  <h2 className="text-sm font-semibold font-display text-foreground">
                    Recent Activity
                  </h2>
                </div>
                <span className="text-xs text-muted-foreground">
                  Last 7 days
                </span>
              </div>

              <div className="p-3">
                <ActivityFeed items={recentActivity as ActivityItem[]} />
              </div>

              {/* Mini session summary */}
              <div
                className="mx-3 mb-3 px-3 py-2.5 rounded-lg flex items-center justify-between"
                style={{
                  background: "oklch(0.62 0.18 270 / 0.08)",
                  border: "1px solid oklch(0.62 0.18 270 / 0.2)",
                }}
                data-ocid="dashboard.session_summary"
              >
                <div className="flex items-center gap-2">
                  <Zap size={14} style={{ color: "oklch(0.72 0.18 270)" }} />
                  <span className="text-xs text-foreground font-medium">
                    Start today's focus session
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="dashboard.start_session_button"
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-lg transition-smooth",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                  style={{
                    background: "oklch(0.62 0.18 270)",
                    color: "oklch(0.145 0.014 270)",
                  }}
                >
                  Start
                </button>
              </div>
            </div>
          </motion.section>

          {/* Pinned Resources — 2/5 */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.28 }}
            aria-label="Pinned resources"
            className="lg:col-span-2"
          >
            <div className="surface-elevated rounded-xl overflow-hidden h-full">
              <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-border">
                <Pin size={15} style={{ color: "oklch(0.78 0.17 70)" }} />
                <h2 className="text-sm font-semibold font-display text-foreground">
                  Pinned Resources
                </h2>
              </div>

              <div className="p-3 flex flex-col gap-2">
                {PINNED_RESOURCES.map((set, index) => (
                  <motion.div
                    key={set.id.toString()}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 + index * 0.07 }}
                    data-ocid={`pinned.item.${index + 1}`}
                    className={cn(
                      "group p-3 rounded-lg border border-border",
                      "hover:border-primary transition-smooth cursor-pointer",
                    )}
                    style={{
                      background: "oklch(0.15 0.012 260 / 0.6)",
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: "oklch(0.62 0.18 270 / 0.12)",
                          border: "1px solid oklch(0.62 0.18 270 / 0.25)",
                        }}
                      >
                        <BookOpen
                          size={13}
                          style={{ color: "oklch(0.72 0.18 270)" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {set.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                          {set.subject}
                        </p>
                      </div>
                    </div>

                    {/* AI summary snippet */}
                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                      {set.aiSummary}
                    </p>

                    {/* Quiz button */}
                    <button
                      type="button"
                      data-ocid={`pinned.quiz_button.${index + 1}`}
                      onClick={() => setSelectedQuizSet(set)}
                      className={cn(
                        "mt-2.5 w-full py-1.5 rounded-lg text-xs font-semibold transition-smooth",
                        "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "hover:opacity-90",
                      )}
                      style={{
                        background: "oklch(0.62 0.18 270 / 0.1)",
                        borderColor: "oklch(0.62 0.18 270 / 0.3)",
                        color: "oklch(0.72 0.18 270)",
                      }}
                    >
                      Generate Quiz
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* AI Tutor Sidebar */}
      <AiTutorSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Quiz Modal */}
      <QuizModal
        studySet={selectedQuizSet}
        open={selectedQuizSet !== null}
        onClose={() => setSelectedQuizSet(null)}
      />
    </div>
  );
}
