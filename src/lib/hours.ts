import { weeklyHours, type DayKey } from "@/data/hours";

const DAY_MAP: DayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function getTodayKey(date = new Date()): DayKey {
  return DAY_MAP[date.getDay()];
}

export function isStoreOpen(date = new Date()): boolean {
  const today = weeklyHours.find((d) => d.key === getTodayKey(date));
  if (!today?.open || !today.close) return false;

  const now = date.getHours() * 60 + date.getMinutes();
  const open = parseTime(today.open);
  const close = parseTime(today.close);
  return now >= open && now < close;
}

export function getTodayHoursDisplay(date = new Date()): string {
  const today = weeklyHours.find((d) => d.key === getTodayKey(date));
  return today?.display ?? "Closed";
}
