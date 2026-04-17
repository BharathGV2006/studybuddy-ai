import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { StudySession } from "../types";

interface ChartDataPoint {
  day: string;
  ai: number;
  solo: number;
}

interface StudyChartProps {
  sessions: StudySession[];
}

function buildChartData(sessions: StudySession[]): ChartDataPoint[] {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const buckets: Record<string, { ai: number; solo: number }> = {};
  for (const d of days) {
    buckets[d] = { ai: 0, solo: 0 };
  }

  for (const s of sessions) {
    const msTimestamp = Number(s.startedAt / BigInt(1_000_000));
    const date = new Date(msTimestamp);
    const dayKey = days[date.getDay()];
    const hrs = Number(s.durationSeconds) / 3600;
    if (s.aiAssisted) {
      buckets[dayKey].ai += hrs;
    } else {
      buckets[dayKey].solo += hrs;
    }
  }

  return days.map((day) => ({
    day,
    ai: Math.round(buckets[day].ai * 10) / 10,
    solo: Math.round(buckets[day].solo * 10) / 10,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="glass rounded-xl p-3 text-sm border"
      style={{
        background: "oklch(0.18 0.014 260 / 0.95)",
        borderColor: "oklch(0.28 0.02 260 / 0.4)",
        boxShadow: "0 8px 24px oklch(0.62 0.18 270 / 0.15)",
      }}
    >
      <p className="font-display font-semibold text-foreground mb-2">{label}</p>
      {payload.map((entry: { name: string; value: number; color: string }) => (
        <p key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-muted-foreground capitalize">
            {entry.name === "ai" ? "AI-Assisted" : "Solo"}:
          </span>
          <span className="font-semibold text-foreground">{entry.value}h</span>
        </p>
      ))}
    </div>
  );
}

export function StudyChart({ sessions }: StudyChartProps) {
  const data = buildChartData(sessions);

  return (
    <div className="w-full" data-ocid="analytics.study_chart">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          barCategoryGap="32%"
          barGap={4}
          margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="oklch(0.28 0.02 260 / 0.3)"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="day"
            tick={{
              fill: "oklch(0.55 0.01 260)",
              fontSize: 12,
              fontFamily: "DM Sans, sans-serif",
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{
              fill: "oklch(0.55 0.01 260)",
              fontSize: 11,
              fontFamily: "DM Sans, sans-serif",
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}h`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "oklch(0.22 0.02 260 / 0.4)", radius: 6 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value: string) =>
              value === "ai" ? "AI-Assisted" : "Solo"
            }
            wrapperStyle={{
              fontSize: "12px",
              color: "oklch(0.55 0.01 260)",
              fontFamily: "DM Sans, sans-serif",
              paddingTop: "12px",
            }}
          />
          <Bar
            dataKey="ai"
            name="ai"
            fill="oklch(0.62 0.18 270)"
            radius={[6, 6, 0, 0]}
            style={{
              filter: "drop-shadow(0 2px 8px oklch(0.62 0.18 270 / 0.3))",
            }}
          />
          <Bar
            dataKey="solo"
            name="solo"
            fill="oklch(0.40 0.02 260)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
