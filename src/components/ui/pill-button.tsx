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
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`relative z-0 inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-base font-semibold tracking-[0.3px] text-ink transition-all duration-200 ease-out hover:z-10 hover:-translate-y-[3px] hover:scale-[1.05] hover:shadow-[0px_14px_24px_-6px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-[0.98] active:shadow-none ${variantClasses[variant]} ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 rounded-full border-[1.6px] border-b-4 border-r-4 border-ink" />
    </Link>
  );
}
