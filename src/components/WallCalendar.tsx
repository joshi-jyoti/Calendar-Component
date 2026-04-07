import { useState, useCallback, useEffect, useRef } from "react";
import calendarHero from "@/assets/download.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarGrid from "./calendar/CalendarGrid";
import { MONTH_THEMES } from "./calendar/themes";
import { getHolidaysForMonth } from "./calendar/holidays";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONTH_NAMES = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

const FLIP_DURATION_MS = 1400;
const FLIP_SWAP_MS = 700;
const BASE_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 61 }, (_, i) => BASE_YEAR - 30 + i);

export default function WallCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [flipping, setFlipping] = useState<"forward" | "backward" | null>(null);
  const swapTimerRef = useRef<number | null>(null);
  const endTimerRef = useRef<number | null>(null);

  const theme = MONTH_THEMES[currentMonth];
  const holidays = getHolidaysForMonth(currentMonth);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date);
        setRangeEnd(null);
      } else {
        if (date.getTime() < rangeStart.getTime()) {
          setRangeEnd(rangeStart);
          setRangeStart(date);
        } else {
          setRangeEnd(date);
        }
      }
    },
    [rangeStart, rangeEnd]
  );

  const navigateMonth = (direction: "forward" | "backward") => {
    if (flipping) return;
    setFlipping(direction);

    swapTimerRef.current = window.setTimeout(() => {
      if (direction === "forward") {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
      } else {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
      }
    }, FLIP_SWAP_MS);

    endTimerRef.current = window.setTimeout(() => {
      setFlipping(null);
    }, FLIP_DURATION_MS);
  };

  useEffect(() => {
    return () => {
      if (swapTimerRef.current !== null) {
        window.clearTimeout(swapTimerRef.current);
      }
      if (endTimerRef.current !== null) {
        window.clearTimeout(endTimerRef.current);
      }
    };
  }, []);

  const noteKey = rangeStart && rangeEnd
    ? `${rangeStart.toDateString()}_${rangeEnd.toDateString()}`
    : rangeStart
    ? rangeStart.toDateString()
    : `${currentYear}-${currentMonth}`;

  const currentNote = notes[noteKey] || "";

  const handleNoteChange = (value: string) => {
    setNotes(prev => ({ ...prev, [noteKey]: value }));
  };

  const handleMonthJump = (month: number) => {
    if (flipping) return;
    setCurrentMonth(month);
  };

  const handleYearJump = (year: number) => {
    if (flipping) return;
    setCurrentYear(year);
  };

  return (
    <div className="flex items-start justify-center min-h-screen p-3 sm:p-4 md:p-8 pt-10 sm:pt-12">
      <div className="relative w-full max-w-[380px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px]">
        {/* Wall pin */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-md border border-gray-400" />
          <div className="w-0.5 h-4 bg-gray-400" />
        </div>

        {/* String/hook */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
          <svg width="40" height="16" viewBox="0 0 40 16" fill="none" className="drop-shadow-sm">
            <path d="M0 16 Q20 0 40 16" stroke="#9ca3af" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Calendar Card - entire card flips */}
        <div
          className={`relative bg-calendar-bg rounded-lg overflow-hidden shadow-[0_8px_40px_-12px_hsl(var(--calendar-shadow)/0.18)] ${
            flipping === "forward" ? "animate-page-flip-forward" : flipping === "backward" ? "animate-page-flip-backward" : ""
          }`}
          style={{ transformStyle: "preserve-3d", perspective: "2000px" }}
        >
          {flipping && (
            <div className="absolute inset-0 z-40 pointer-events-none page-turn-overlay">
              <div className="page-turn-sheen" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="page-turn-chip">
                  Turning page
                  <span className="page-turn-dots" aria-hidden="true" />
                </div>
              </div>
            </div>
          )}

          {/* Top spiral wire inside calendar */}
          <div className="relative h-11 sm:h-12 bg-slate-50 z-10 overflow-hidden border-b border-slate-300/60">
            <svg viewBox="0 0 520 48" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <filter id="spiralShadow" x="-20%" y="-20%" width="140%" height="160%">
                  <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodColor="#000" floodOpacity="0.22" />
                </filter>
              </defs>

              <line x1="10" y1="16" x2="238" y2="16" stroke="#1f252d" strokeWidth="1.8" />
              <line x1="282" y1="16" x2="510" y2="16" stroke="#1f252d" strokeWidth="1.8" />

              <path d="M238 16 Q260 -6 282 16" fill="none" stroke="#1f252d" strokeWidth="2.2" />
              <ellipse cx="260" cy="20" rx="22" ry="7" fill="#ffffff" opacity="0.85" />

              <rect x="0" y="17" width="520" height="13" fill="#eef2f7" opacity="0.9" />

              {Array.from({ length: 44 }).map((_, i) => {
                const x = 2 + i * 11.8;

                return (
                  <rect
                    key={`slot-${i}`}
                    x={x - 0.2}
                    y="17.2"
                    width="7.6"
                    height="7.2"
                    rx="0.6"
                    fill="#d9dfe7"
                    stroke="#8b98a8"
                    strokeWidth="0.8"
                  />
                );
              })}

              {Array.from({ length: 44 }).map((_, i) => {
                const x = 2 + i * 11.8;

                return (
                  <g key={i} filter="url(#spiralShadow)">
                    <path
                      d={`M${x} 16 v11 M${x} 16 q3.6 -6.2 7.2 0 M${x + 7.2} 16 v11`}
                      fill="none"
                      stroke="#11161d"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Hero Image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <img
              src={calendarHero}
              alt="Calendar landscape"
              className="w-full h-full object-cover"
            />
            {/* Decorative wave overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20">
              <svg viewBox="0 0 460 60" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M0 60 L0 30 Q115 0 230 30 Q345 60 460 30 L460 60 Z"
                  fill="white"
                  fillOpacity="0.95"
                />
                <path
                  d="M0 60 L0 40 Q160 10 320 40 Q400 55 460 35 L460 60 Z"
                  fill={`hsl(${theme.accentHsl})`}
                  fillOpacity="0.9"
                />
              </svg>
            </div>

            {/* Month/Year overlay */}
            <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-6 text-right z-10">
              <div
                className="inline-flex flex-col items-end rounded-[14px] px-3 py-2"
                style={{
                  background: `linear-gradient(135deg, hsl(${theme.accentHsl}), hsl(${theme.accentHsl} / 0.72))`,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.28)",
                }}
              >
                <div
                  className="text-base sm:text-lg md:text-xl font-medium leading-none tracking-[0.03em]"
                  style={{ color: "rgba(255,255,255,0.96)", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
                >
                  {currentYear}
                </div>
                <div
                  className="font-display text-[30px] sm:text-[35px] md:text-[40px] leading-none tracking-[0.03em] font-bold mt-1"
                  style={{ color: "rgba(255,255,255,0.99)", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
                >
                  {MONTH_NAMES[currentMonth]}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section: notes + grid side by side */}
          <div className="flex flex-row">
            {/* Notes */}
            <div className="w-[30%] min-w-[88px] max-w-[116px] sm:w-[32%] sm:min-w-[100px] sm:max-w-[132px] border-r border-calendar-notes-border">
              <div className="px-3 pt-2 pb-0">
                <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground">Notes</span>
              </div>
              <div className="relative px-3">
                <textarea
                  key={noteKey}
                  value={currentNote}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  placeholder="Write here..."
                  className="w-full text-[10px] sm:text-[11px] bg-transparent resize-none border-none outline-none text-foreground placeholder:text-muted-foreground/50 leading-[19px] sm:leading-[22px] relative z-10 h-[170px] sm:h-[220px]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 19px, hsl(var(--calendar-notes-border)) 19px, hsl(var(--calendar-notes-border)) 20px)",
                    backgroundSize: "100% 20px",
                    paddingTop: "2px",
                  }}
                />
              </div>
            </div>

            {/* Calendar grid (right side) */}
            <div className="flex-1 flex flex-col">
              {/* Navigation */}
              <div className="mx-1.5 sm:mx-2 mb-1 mt-2 rounded-lg border border-calendar-notes-border/80 bg-white/70 px-1.5 sm:px-2 py-1.5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-2">
                <button onClick={() => navigateMonth("backward")} disabled={!!flipping} className="h-7 w-7 rounded-md border border-transparent hover:border-calendar-notes-border hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center" aria-label="Previous month">
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <div className="flex items-center gap-1.5">
                  <Select
                    value={String(currentMonth)}
                    onValueChange={(value) => handleMonthJump(Number(value))}
                    disabled={!!flipping}
                  >
                    <SelectTrigger aria-label="Jump to month" className="h-7 w-[88px] border-calendar-notes-border bg-background/90 px-2 text-[10px] font-semibold tracking-wide">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-56">
                      {MONTH_NAMES.map((month, index) => (
                        <SelectItem key={month} value={String(index)} className="text-[11px]">
                          {month.slice(0, 3)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={String(currentYear)}
                    onValueChange={(value) => handleYearJump(Number(value))}
                    disabled={!!flipping}
                  >
                    <SelectTrigger aria-label="Jump to year" className="h-7 w-[78px] border-calendar-notes-border bg-background/90 px-2 text-[10px] font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-56">
                      {YEAR_OPTIONS.map((year) => (
                        <SelectItem key={year} value={String(year)} className="text-[11px]">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <button onClick={() => navigateMonth("forward")} disabled={!!flipping} className="h-7 w-7 rounded-md border border-transparent hover:border-calendar-notes-border hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center" aria-label="Next month">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
                </div>
              </div>

              <CalendarGrid
                year={currentYear}
                month={currentMonth}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                onDayClick={handleDayClick}
                accentHsl={theme.accentHsl}
              />

              {/* Holiday indicators */}
              {holidays.length > 0 && (
                <div className="px-3 pb-2 flex flex-wrap gap-1">
                  {holidays.slice(0, 3).map((h) => (
                    <span key={h.day} className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {h.emoji} {h.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Range info */}
          {rangeStart && (
            <div className="px-4 pb-2 text-[10px] text-muted-foreground text-center border-t border-calendar-notes-border pt-1.5">
              📅 {rangeStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              {rangeEnd && ` — ${rangeEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
              {!rangeEnd && " — Select end date"}
            </div>
          )}
        </div>

        {/* Shadow beneath calendar */}
        <div className="mx-6 h-4 bg-gradient-to-b from-black/5 to-transparent rounded-b-full" />
      </div>
    </div>
  );
}
