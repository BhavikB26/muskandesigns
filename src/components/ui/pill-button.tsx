import { type ReactNode } from "react";
import Link from "next/link";

type PillButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "white" | "pink";
  className?: string;
  target?: string;
};

const variantClasses: Record<NonNullable<PillButtonProps["variant"]>, string> = {
  white: "bg-white",
  pink: "bg-pink",
};

export function PillButton({
  href,
  children,
  variant = "white",
  className = "",
  target,
}: PillButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={`relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-base font-semibold tracking-[0.3px] text-ink ${variantClasses[variant]} ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 rounded-full border-[1.6px] border-b-4 border-r-4 border-ink" />
    </Link>
  );
}
