export interface Holiday {
  month: number; // 0-indexed
  day: number;
  name: string;
  emoji: string;
}

export const HOLIDAYS: Holiday[] = [
  { month: 0, day: 1, name: "New Year's Day", emoji: "🎆" },
  { month: 0, day: 15, name: "Martin Luther King Jr. Day", emoji: "✊" },
  { month: 1, day: 14, name: "Valentine's Day", emoji: "❤️" },
  { month: 2, day: 17, name: "St. Patrick's Day", emoji: "☘️" },
  { month: 3, day: 1, name: "April Fools' Day", emoji: "🤡" },
  { month: 3, day: 22, name: "Earth Day", emoji: "🌍" },
  { month: 4, day: 1, name: "May Day", emoji: "🌸" },
  { month: 4, day: 12, name: "Mother's Day", emoji: "💐" },
  { month: 5, day: 16, name: "Father's Day", emoji: "👔" },
  { month: 6, day: 4, name: "Independence Day", emoji: "🇺🇸" },
  { month: 8, day: 1, name: "Labor Day", emoji: "⚒️" },
  { month: 9, day: 31, name: "Halloween", emoji: "🎃" },
  { month: 10, day: 11, name: "Veterans Day", emoji: "🎖️" },
  { month: 10, day: 27, name: "Thanksgiving", emoji: "🦃" },
  { month: 11, day: 25, name: "Christmas", emoji: "🎄" },
  { month: 11, day: 31, name: "New Year's Eve", emoji: "🥂" },
];

export function getHolidaysForMonth(month: number): Holiday[] {
  return HOLIDAYS.filter((h) => h.month === month);
}

export function getHolidayForDay(month: number, day: number): Holiday | undefined {
  return HOLIDAYS.find((h) => h.month === month && h.day === day);
}
