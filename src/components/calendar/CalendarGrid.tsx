import { useMemo, useCallback } from "react";
import { getHolidayForDay } from "./holidays";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

function getCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();
  const startDow = (firstDay.getDay() + 6) % 7;
  const days: CalendarDay[] = [];

  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d, isCurrentMonth: false, isToday: false });
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    days.push({
      date,
      isCurrentMonth: true,
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    });
  }

  // Fill to complete 5 or 6 rows
  const totalRows = days.length > 35 ? 42 : 35;
  while (days.length < totalRows) {
    const d = new Date(year, month + 1, days.length - startDow - lastDay.getDate() + 1);
    days.push({ date: d, isCurrentMonth: false, isToday: false });
  }

  return days;
}

function isSameDay(a: Date, b: Date) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
}

interface CalendarGridProps {
  year: number;
  month: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onDayClick: (date: Date) => void;
  accentHsl: string;
}

export default function CalendarGrid({ year, month, rangeStart, rangeEnd, onDayClick, accentHsl }: CalendarGridProps) {
  const days = useMemo(() => getCalendarDays(year, month), [year, month]);

  const getDayClasses = useCallback((day: CalendarDay) => {
    const isStart = rangeStart && isSameDay(day.date, rangeStart);
    const isEnd = rangeEnd && isSameDay(day.date, rangeEnd);
    const inRange = isInRange(day.date, rangeStart, rangeEnd);
    const dayOfWeek = (day.date.getDay() + 6) % 7;
    const isWeekend = dayOfWeek >= 5;

    let base = "relative flex items-center justify-center h-8 w-full text-sm cursor-pointer transition-all duration-150 select-none rounded-sm ";

    if (!day.isCurrentMonth) {
      base += "text-calendar-outside ";
    } else if (isWeekend) {
      base += "text-calendar-weekend font-semibold ";
    } else {
      base += "text-foreground ";
    }

    if (isStart || isEnd) {
      base += "font-bold rounded-md z-10 ";
    } else if (inRange && day.isCurrentMonth) {
      base += "bg-calendar-range ";
    } else if (day.isToday) {
      base += "ring-2 ring-calendar-today font-bold ";
    }

    if (!isStart && !isEnd) {
      base += "hover:bg-calendar-day-hover ";
    }

    return base;
  }, [rangeStart, rangeEnd]);

  return (
    <div className="px-2 sm:px-3 md:px-4 pb-3">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-0.5">
        {DAY_HEADERS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-[10px] sm:text-[11px] font-semibold py-1.5 ${
              i >= 5 ? "text-calendar-weekend" : "text-muted-foreground"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day, i) => {
          const holiday = day.isCurrentMonth ? getHolidayForDay(month, day.date.getDate()) : undefined;
          const isStart = rangeStart && isSameDay(day.date, rangeStart);
          const isEnd = rangeEnd && isSameDay(day.date, rangeEnd);

          const cell = (
            <button
              key={i}
              onClick={() => onDayClick(day.date)}
              className={getDayClasses(day)}
              style={(isStart || isEnd) ? { backgroundColor: `hsl(${accentHsl})`, color: 'white' } : undefined}
            >
              <span>{day.date.getDate()}</span>
              {holiday && (
                <span className="absolute -top-0.5 -right-0.5 text-[9px] leading-none">
                  {holiday.emoji}
                </span>
              )}
            </button>
          );

          if (holiday) {
            return (
              <Tooltip key={i}>
                <TooltipTrigger asChild>{cell}</TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {holiday.emoji} {holiday.name}
                </TooltipContent>
              </Tooltip>
            );
          }

          return cell;
        })}
      </div>
    </div>
  );
}
