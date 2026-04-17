import { BookOpen, Clock, Flame, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ProgressRing } from "../components/ProgressRing";
import { StudyChart } from "../components/StudyChart";
import { mockAnalyticsSummary, mockStudySessions } from "../data/mockData";
import type { StudySession } from "../types";

type DateRange = "7d" | "30d" | "all";

interface StatCardData {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent?: boolean;
}

const DAILY_GOAL_HOURS = 6;

function filterSessions(
  sessions: StudySession[],
  range: DateRange,
): StudySession[] {
  if (range === "all") return sessions;
  const now = Date.now();
  const cutoffMs = range === "7d" ? 7 * 86_400_000 : 30 * 86_400_000;
  return sessions.filter((s) => {
    const msTimestamp = Number(s.startedAt / BigInt(1_000_000));
    return now - msTimestamp <= cutoffMs;
  });
}

function toHours(seconds: bigint) {
  return Number(seconds) / 3600;
}

function calcStats(sessions: StudySession[]) {
  const total = sessions.reduce((a, s) => a + Number(s.durationSeconds), 0);
  const totalHrs = total / 3600;
  const avgSecs = sessions.length ? total / sessions.length : 0;
  const avgMin = Math.round(avgSecs / 60);
  const subjects = new Set(sessions.map((s) => s.subject)).size;
  // streak: count consecutive days from today backwards
  const days = new Set(
    sessions.map((s) => {
      const ms = Number(s.startedAt / BigInt(1_000_000));
      return new Date(ms).toDateString();
    }),
  );
  let streak = 0;
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    if (days.has(d.toDateString())) streak++;
    else if (i > 0) break;
  }
  return { totalHrs, avgMin, subjects, streak };
}

export default function Analytics() {
  const [range, setRange] = useState<DateRange>("7d");

  const filtered = useMemo(
    () => filterSessions(mockStudySessions, range),
    [range],
  );
  const stats = useMemo(() => calcStats(filtered), [filtered]);

  const aiHours = useMemo(
    () =>
      toHours(
        filtered
          .filter((s) => s.aiAssisted)
          .reduce((a, s) => a + s.durationSeconds, BigInt(0)),
      ),
    [filtered],
  );

  const todaySessions = useMemo(() => {
    const today = new Date().toDateString();
    return filtered.filter((s) => {
      const ms = Number(s.startedAt / BigInt(1_000_000));
      return new Date(ms).toDateString() === today;
    });
  }, [filtered]);

  const todayHours = useMemo(
    () =>
      toHours(todaySessions.reduce((a, s) => a + s.durationSeconds, BigInt(0))),
    [todaySessions],
  );

  const totalAiHours = toHours(mockAnalyticsSummary.aiAssistedSeconds);
  const totalSoloHours = toHours(mockAnalyticsSummary.soloSeconds);
  const aiPct = Math.round(
    (totalAiHours / (totalAiHours + totalSoloHours || 1)) * 100,
  );

  const statCards: StatCardData[] = [
    {
      label: "Total Hours",
      value: `${stats.totalHrs.toFixed(1)}h`,
      sub: `${filtered.length} sessions`,
      icon: <Clock className="w-4 h-4" />,
      accent: true,
    },
    {
      label: "Avg Session",
      value: `${stats.avgMin}m`,
      sub: "per session",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      label: "Subjects",
      value: `${stats.subjects}`,
      sub: "studied",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      label: "Streak",
      value: `${stats.streak}d`,
      sub: "current streak",
      icon: <Flame className="w-4 h-4" />,
    },
  ];

  const rangeOptions: { label: string; value: DateRange }[] = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "All time", value: "all" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8" data-ocid="analytics.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
            Learning Analytics
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track your study patterns and optimize performance
          </p>
        </div>

        {/* Date range filter */}
        <div
          className="glass rounded-xl p-1 flex gap-1 w-fit"
          data-ocid="analytics.date_filter"
          role="tablist"
          aria-label="Date range filter"
        >
          {rangeOptions.map((opt) => (
            <button
              key={opt.value}
              role="tab"
              aria-selected={range === opt.value}
              data-ocid={`analytics.filter.${opt.value}`}
              type="button"
              onClick={() => setRange(opt.value)}
              className={[
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth",
                range === opt.value
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              style={
                range === opt.value
                  ? {
                      background: "oklch(0.62 0.18 270 / 0.2)",
                      boxShadow: "0 0 12px oklch(0.62 0.18 270 / 0.25)",
                      color: "oklch(0.78 0.14 270)",
                    }
                  : {}
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        data-ocid="analytics.stats_grid"
      >
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 + i * 0.07 }}
            data-ocid={`analytics.stat_card.${i + 1}`}
            className="glass rounded-xl p-5 flex items-start gap-4 transition-smooth hover:border-primary/20 group"
            style={
              card.accent ? { borderColor: "oklch(0.62 0.18 270 / 0.2)" } : {}
            }
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-smooth group-hover:scale-105"
              style={{
                background: card.accent
                  ? "oklch(0.62 0.18 270 / 0.15)"
                  : "oklch(0.22 0.02 260)",
                color: card.accent
                  ? "oklch(0.78 0.14 270)"
                  : "oklch(0.55 0.01 260)",
                boxShadow: card.accent
                  ? "0 0 12px oklch(0.62 0.18 270 / 0.2)"
                  : "none",
              }}
            >
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs mb-1">{card.label}</p>
              <p
                className="font-display text-2xl font-bold leading-none"
                style={{
                  color: card.accent
                    ? "oklch(0.78 0.14 270)"
                    : "oklch(0.95 0.01 260)",
                }}
              >
                {card.value}
              </p>
              <p className="text-muted-foreground text-xs mt-1">{card.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main content: progress ring + chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress ring panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          data-ocid="analytics.progress_panel"
          className="glass rounded-2xl p-6 flex flex-col items-center gap-6"
        >
          <div className="w-full">
            <h2 className="font-display font-semibold text-foreground text-sm mb-0.5">
              Today's Progress
            </h2>
            <p className="text-muted-foreground text-xs">
              Daily goal: {DAILY_GOAL_HOURS}h
            </p>
          </div>

          <ProgressRing
            current={todayHours || 4.5}
            goal={DAILY_GOAL_HOURS}
            unit="hrs"
            size={200}
            strokeWidth={14}
            label="Daily Goal"
          />

          {/* AI vs Solo split */}
          <div className="w-full space-y-3">
            <p className="font-display text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Session Split (All Time)
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "oklch(0.62 0.18 270)" }}
                  />
                  <span className="text-muted-foreground">AI-Assisted</span>
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.78 0.14 270)" }}
                >
                  {totalAiHours.toFixed(1)}h · {aiPct}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "oklch(0.22 0.02 260)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${aiPct}%`,
                    background: "oklch(0.62 0.18 270)",
                    boxShadow: "0 0 8px oklch(0.62 0.18 270 / 0.5)",
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "oklch(0.40 0.02 260)" }}
                  />
                  <span className="text-muted-foreground">Solo</span>
                </span>
                <span className="font-semibold text-foreground">
                  {totalSoloHours.toFixed(1)}h · {100 - aiPct}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "oklch(0.22 0.02 260)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${100 - aiPct}%`,
                    background: "oklch(0.40 0.02 260)",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bar chart panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          data-ocid="analytics.chart_panel"
          className="glass rounded-2xl p-6 lg:col-span-2 flex flex-col gap-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display font-semibold text-foreground text-sm mb-0.5">
                Study Hours by Day
              </h2>
              <p className="text-muted-foreground text-xs">
                AI-assisted vs solo sessions
              </p>
            </div>
            <div
              className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{
                background: "oklch(0.62 0.18 270 / 0.1)",
                color: "oklch(0.78 0.14 270)",
              }}
            >
              {filtered.length} sessions
            </div>
          </div>

          <StudyChart sessions={filtered} />

          {/* Summary row */}
          <div
            className="grid grid-cols-2 gap-3 pt-2 border-t"
            style={{ borderColor: "oklch(0.28 0.02 260 / 0.4)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: "oklch(0.62 0.18 270 / 0.15)",
                  color: "oklch(0.78 0.14 270)",
                }}
              >
                AI
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  {aiHours.toFixed(1)}h
                </p>
                <p className="text-muted-foreground text-xs">AI-assisted</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: "oklch(0.22 0.02 260)",
                  color: "oklch(0.55 0.01 260)",
                }}
              >
                S
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  {(stats.totalHrs - aiHours).toFixed(1)}h
                </p>
                <p className="text-muted-foreground text-xs">Solo sessions</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
