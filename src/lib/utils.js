import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { differenceInDays, startOfDay } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateNights(from, to) {
  if (!from || !to) return 0;
  return differenceInDays(startOfDay(to), startOfDay(from));
}