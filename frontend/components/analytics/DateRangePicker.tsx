"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { DateRangeFilter } from "@/lib/analytics";

interface DateRangePickerProps {
  value: DateRangeFilter;
  onChange: (filter: DateRangeFilter) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRangeChange = (range: "7d" | "30d" | "custom") => {
    if (range === "custom") {
      setIsOpen(true);
      return;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (range === "7d" ? 7 : 30));

    onChange({
      range,
      startDate,
      endDate,
    });
  };

  const handleCustomDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange({
        range: "custom",
        startDate: value.startDate || date,
        endDate: date,
      });
    }
  };

  const getButtonLabel = () => {
    switch (value.range) {
      case "7d":
        return "Last 7 Days";
      case "30d":
        return "Last 30 Days";
      case "custom":
        if (value.startDate && value.endDate) {
          return `${format(value.startDate, "MMM dd")} - ${format(value.endDate, "MMM dd, yyyy")}`;
        }
        return "Custom Range";
      default:
        return "Select Range";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      {/* Preset buttons */}
      <div className="flex gap-2" role="group" aria-label="Date range presets">
        <Button
          variant={value.range === "7d" ? "default" : "outline"}
          size="sm"
          onClick={() => handleRangeChange("7d")}
          className="text-sm"
          aria-pressed={value.range === "7d"}
        >
          Last 7 Days
        </Button>
        <Button
          variant={value.range === "30d" ? "default" : "outline"}
          size="sm"
          onClick={() => handleRangeChange("30d")}
          className="text-sm"
          aria-pressed={value.range === "30d"}
        >
          Last 30 Days
        </Button>
      </div>

      {/* Custom date picker */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={value.range === "custom" ? "default" : "outline"}
            size="sm"
            className="text-sm"
            onClick={() => setIsOpen(true)}
          >
            <CalendarIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            {getButtonLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <Calendar
              mode="single"
              selected={value.endDate}
              onSelect={handleCustomDateSelect}
              initialFocus
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
