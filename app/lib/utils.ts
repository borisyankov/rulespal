import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { UIMessage } from "ai"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function messageText(m: UIMessage): string {
  return m.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
}
