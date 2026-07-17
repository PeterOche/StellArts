"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import type { ChartDataPoint } from "@/lib/analytics";

interface MainChartProps {
  data: ChartDataPoint[];
  title?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const formattedDate = label ? format(parseISO(label), "MMM dd, yyyy") : "";

    return (
      <div
        className="rounded-lg border border-border bg-card p-3 shadow-lg"
        role="tooltip"
        aria-label={`Data for ${formattedDate}`}
      >
        <p className="text-sm font-semibold text-foreground mb-2">
          {formattedDate}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export function MainChart({
  data,
  title = "Performance Overview",
}: MainChartProps) {
  const chartData = data.map((point) => ({
    date: point.date,
    "Current Period": point.current,
    "Previous Period": point.previous,
  }));

  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-100">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => format(parseISO(value), "MMM dd")}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  color: "hsl(var(--muted-foreground))",
                }}
              />
              <Line
                type="monotone"
                dataKey="Current Period"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2 }}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="Previous Period"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
