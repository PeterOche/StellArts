"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "./Sparkline";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  change: number;
  sparklineData: number[];
}

export function KpiCard({ label, value, change, sparklineData }: KpiCardProps) {
  const isPositive = change >= 0;
  const sparklineColor = isPositive ? "#10b981" : "#ef4444";

  return (
    <Card
      className="group relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-card/80"
      role="article"
      aria-label={`${label}: ${value}`}
    >
      {/* Glassmorphism gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {label}
            </p>
            <p className="text-3xl font-bold text-foreground tracking-tight">
              {value}
            </p>
          </div>
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
            aria-label={`${isPositive ? "Increase" : "Decrease"} of ${Math.abs(change)} percent`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
            ) : (
              <TrendingDown className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        </div>

        {/* Sparkline */}
        <div className="mt-2" aria-hidden="true">
          <Sparkline data={sparklineData} color={sparklineColor} height={40} />
        </div>
      </CardContent>
    </Card>
  );
}
