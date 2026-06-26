/**
 * Analytics Dashboard data types and utilities
 */

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change: number; // percentage change (positive = good, negative = bad)
  sparklineData: number[];
}

export interface ChartDataPoint {
  date: string;
  current: number;
  previous: number;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: "booking" | "payment" | "review" | "user" | "system";
  title: string;
  description: string;
  icon: string;
}

export type DateRange = "7d" | "30d" | "custom";

export interface DateRangeFilter {
  range: DateRange;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Generate mock sparkline data
 */
export function generateSparklineData(
  points: number = 7,
  min: number = 10,
  max: number = 100,
): number[] {
  return Array.from(
    { length: points },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
}

/**
 * Generate mock chart data for current and previous month
 */
export function generateChartData(days: number = 30): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toISOString().split("T")[0],
      current: Math.floor(Math.random() * 500) + 200,
      previous: Math.floor(Math.random() * 400) + 150,
    });
  }

  return data;
}

/**
 * Generate mock activity events
 */
export function generateActivityEvents(count: number = 10): ActivityEvent[] {
  const types: ActivityEvent["type"][] = [
    "booking",
    "payment",
    "review",
    "user",
    "system",
  ];
  const events: ActivityEvent[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - i * 3600000 * 2);
    const type = types[Math.floor(Math.random() * types.length)];

    events.push({
      id: `event-${i}`,
      timestamp: timestamp.toISOString(),
      type,
      title: getActivityTitle(type),
      description: getActivityDescription(type),
      icon: getActivityIcon(type),
    });
  }

  return events;
}

function getActivityTitle(type: ActivityEvent["type"]): string {
  const titles: Record<ActivityEvent["type"], string> = {
    booking: "New Booking Created",
    payment: "Payment Processed",
    review: "New Review Received",
    user: "User Registered",
    system: "System Update",
  };
  return titles[type];
}

function getActivityDescription(type: ActivityEvent["type"]): string {
  const descriptions: Record<ActivityEvent["type"], string[]> = {
    booking: [
      "Booking #1234 confirmed for artisan service",
      "New service request pending approval",
      "Booking completed successfully",
    ],
    payment: [
      "Payment of $250.00 received via Stellar",
      "Escrow released to artisan wallet",
      "Transaction hash: 0x1234...5678",
    ],
    review: [
      "5-star rating from client John Doe",
      "New feedback received for carpentry work",
      "Review pending moderation",
    ],
    user: [
      "New artisan joined the platform",
      "Client account verified",
      "User profile updated",
    ],
    system: [
      "Platform maintenance completed",
      "Smart contract deployed successfully",
      "Database backup completed",
    ],
  };
  const options = descriptions[type];
  return options[Math.floor(Math.random() * options.length)];
}

function getActivityIcon(type: ActivityEvent["type"]): string {
  const icons: Record<ActivityEvent["type"], string> = {
    booking: "calendar",
    payment: "dollar-sign",
    review: "star",
    user: "user",
    system: "settings",
  };
  return icons[type];
}

/**
 * Generate mock KPI metrics
 */
export function generateKpiMetrics(): KpiMetric[] {
  return [
    {
      id: "revenue",
      label: "Total Revenue",
      value: "$45,231",
      change: 12.5,
      sparklineData: generateSparklineData(7, 3000, 8000),
    },
    {
      id: "users",
      label: "Active Users",
      value: "1,234",
      change: 8.3,
      sparklineData: generateSparklineData(7, 100, 300),
    },
    {
      id: "conversion",
      label: "Conversion Rate",
      value: "3.2%",
      change: -2.1,
      sparklineData: generateSparklineData(7, 2, 5),
    },
    {
      id: "bounce",
      label: "Bounce Rate",
      value: "42.3%",
      change: -5.4,
      sparklineData: generateSparklineData(7, 30, 60),
    },
  ];
}
