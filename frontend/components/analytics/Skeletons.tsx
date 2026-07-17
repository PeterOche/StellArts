"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function KpiCardSkeleton() {
  return (
    <Card className="border border-border bg-card">
      <CardContent className="p-6">
        <div className="space-y-3">
          {/* Label skeleton */}
          <div className="h-4 w-24 skeleton-shimmer rounded" />

          {/* Value skeleton */}
          <div className="h-10 w-32 skeleton-shimmer rounded" />

          {/* Sparkline skeleton */}
          <div className="h-10 w-full skeleton-shimmer rounded mt-4" />
        </div>
      </CardContent>
    </Card>
  );
}

export function MainChartSkeleton() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <div className="h-7 w-48 skeleton-shimmer rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-100 w-full skeleton-shimmer rounded" />
      </CardContent>
    </Card>
  );
}

export function ActivityFeedSkeleton() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <div className="h-7 w-40 skeleton-shimmer rounded" />
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            {/* Icon skeleton */}
            <div className="w-4 h-4 skeleton-shimmer rounded-full shrink-0" />

            {/* Content skeleton */}
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-32 skeleton-shimmer rounded" />
                <div className="h-3 w-12 skeleton-shimmer rounded" />
              </div>
              <div className="h-3 w-full skeleton-shimmer rounded" />
              <div className="h-3 w-20 skeleton-shimmer rounded" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function DateRangePickerSkeleton() {
  return (
    <div className="flex gap-2">
      <div className="h-9 w-28 skeleton-shimmer rounded" />
      <div className="h-9 w-28 skeleton-shimmer rounded" />
      <div className="h-9 w-40 skeleton-shimmer rounded" />
    </div>
  );
}
