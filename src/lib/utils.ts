/** Join class names, skipping empty values (the `cn` helper the registry components expect). */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
