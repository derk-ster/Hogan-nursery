export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface DayHours {
  key: DayKey;
  label: string;
  open: string | null;
  close: string | null;
  display: string;
}

export const weeklyHours: DayHours[] = [
  { key: "monday", label: "Monday", open: "08:00", close: "17:00", display: "8 AM to 5 PM" },
  { key: "tuesday", label: "Tuesday", open: "08:00", close: "17:00", display: "8 AM to 5 PM" },
  { key: "wednesday", label: "Wednesday", open: "08:00", close: "17:00", display: "8 AM to 5 PM" },
  { key: "thursday", label: "Thursday", open: "08:00", close: "17:00", display: "8 AM to 5 PM" },
  { key: "friday", label: "Friday", open: "08:00", close: "17:00", display: "8 AM to 5 PM" },
  { key: "saturday", label: "Saturday", open: "08:00", close: "12:00", display: "8 AM to 12 PM" },
  { key: "sunday", label: "Sunday", open: null, close: null, display: "Closed" },
];

export const hoursSummary = "Mon-Fri 8 to 5, Sat 8 to 12, Sun closed";
