"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Star, User, Settings } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { ActivityEvent } from "@/lib/analytics";

interface ActivityFeedProps {
  events: ActivityEvent[];
  title?: string;
}

const iconMap: Record<string, React.ElementType> = {
  calendar: Calendar,
  "dollar-sign": DollarSign,
  star: Star,
  user: User,
  settings: Settings,
};

const colorMap: Record<string, string> = {
  calendar: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  "dollar-sign":
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  star: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  user: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  settings: "bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400",
};

export function ActivityFeed({
  events,
  title = "Recent Activity",
}: ActivityFeedProps) {
  return (
    <Card className="border border-border bg-card h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8" role="status">
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div
            className="relative space-y-6"
            role="list"
            aria-label="Activity timeline"
          >
            {/* Timeline line */}
            <div
              className="absolute left-4 top-0 bottom-0 w-px bg-border"
              aria-hidden="true"
            />

            {events.map((event, index) => {
              const Icon = iconMap[event.icon] || Settings;
              const colorClass = colorMap[event.icon] || colorMap.settings;
              const formattedTime = format(parseISO(event.timestamp), "HH:mm");
              const formattedDate = format(parseISO(event.timestamp), "MMM dd");

              return (
                <div
                  key={event.id}
                  className="relative flex gap-4 pl-2"
                  role="listitem"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-2 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center ${colorClass}`}
                    aria-hidden="true"
                  >
                    <Icon className="w-2 h-2" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 ml-6">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">
                        {event.title}
                      </h4>
                      <time
                        className="text-xs text-muted-foreground whitespace-nowrap"
                        dateTime={event.timestamp}
                        aria-label={`${formattedDate} at ${formattedTime}`}
                      >
                        {formattedTime}
                      </time>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
