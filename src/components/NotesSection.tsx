import { Pencil } from "lucide-react";

interface NotesSectionProps {
  noteKey: string;
  value: string;
  onChange: (val: string) => void;
  rangeStart: Date | null;
  rangeEnd: Date | null;
}

export default function NotesSection({ noteKey, value, onChange, rangeStart, rangeEnd }: NotesSectionProps) {
  const label = rangeStart && rangeEnd
    ? `Notes for ${rangeStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${rangeEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    : rangeStart
    ? `Notes for ${rangeStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    : "General Notes";

  return (
    <div className="bg-calendar-bg rounded-lg shadow-[0_4px_20px_-8px_hsl(var(--calendar-shadow)/0.1)] p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Pencil className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-calendar-header tracking-wide uppercase">
          Notes
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{label}</p>
      <textarea
        key={noteKey}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your notes here..."
        className="flex-1 min-h-[200px] lg:min-h-0 w-full resize-none rounded-md border border-calendar-notes-border bg-calendar-notes-bg p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
      />
      {/* Lined paper effect */}
      <div className="mt-3 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-px bg-calendar-notes-border" />
        ))}
      </div>
    </div>
  );
}
