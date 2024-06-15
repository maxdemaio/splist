import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type SearchTerm = "short_term" | "long_term" | "medium_term";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
