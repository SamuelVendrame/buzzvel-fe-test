type ClassValue = string | false | null | undefined;

/** Joins class names, skipping falsy values. Enough for this project, so no clsx dependency. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
