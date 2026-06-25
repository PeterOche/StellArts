"use client";

import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { KpiCard } from "@/components/analytics/KpiCard";
import { MainChart } from "@/components/analytics/MainChart";
import { ActivityFeed } from "@/components/analytics/ActivityFeed";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import {
  KpiCardSkeleton,
  MainChartSkeleton,
  ActivityFeedSkeleton,
  DateRangePickerSkeleton,
} from "@/components/analytics/Skeletons";
import {
  generateKpiMetrics,
  generateChartData,
  generateActivityEvents,
  type DateRangeFilter,
  type KpiMetric,
  type ChartDataPoint,
  type ActivityEvent,
} from "@/lib/analytics";

export default function AnalyticsDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRangeFilter>({
    range: "30d",
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const [kpiMetrics, setKpiMetrics] = useState<KpiMetric[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>([]);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);

      // Simulate network delay
      setTimeout(() => {
        const days = dateRange.range === "7d" ? 7 : 30;

        setKpiMetrics(generateKpiMetrics());
        setChartData(generateChartData(days));
        setActivityEvents(generateActivityEvents(10));

        setIsLoading(false);
      }, 800);
    };

    fetchData();
  }, [dateRange]);

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor your platform performance and activity
            </p>
          </div>

          {/* Date Range Picker - Sticky */}
          <div className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm p-2 rounded-lg border border-border">
            {isLoading ? (
              <DateRangePickerSkeleton />
            ) : (
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            )}
          </div>
        </div>

        {/* KPI Cards Grid */}
        <section aria-label="Key Performance Indicators">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <KpiCardSkeleton key={i} />
                ))
              : kpiMetrics.map((metric) => (
                  <KpiCard
                    key={metric.id}
                    label={metric.label}
                    value={metric.value}
                    change={metric.change}
                    sparklineData={metric.sparklineData}
                  />
                ))}
          </div>
        </section>

        {/* Main Content Area - Chart + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart - Takes 2 columns on desktop */}
          <section className="lg:col-span-2" aria-label="Performance chart">
            {isLoading ? <MainChartSkeleton /> : <MainChart data={chartData} />}
          </section>

          {/* Activity Feed - Takes 1 column on desktop */}
          <section className="lg:col-span-1" aria-label="Activity feed">
            {isLoading ? (
              <ActivityFeedSkeleton />
            ) : (
              <ActivityFeed events={activityEvents} />
            )}
          </section>
        </div>

        {/* Empty State (if needed) */}
        {!isLoading &&
          kpiMetrics.length === 0 &&
          chartData.length === 0 &&
          activityEvents.length === 0 && (
            <div className="text-center py-16" role="status" aria-live="polite">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Data Available
              </h3>
              <p className="text-muted-foreground">
                Select a different date range or check back later for analytics
                data.
              </p>
            </div>
          )}
      </div>
    </DashboardShell>
  );
}
