import Link from "next/link";
import { getAdjacentCaseStudies } from "@/content/case-studies";

export function PrevNext({ slug }: { slug: string }) {
  const { prev, next } = getAdjacentCaseStudies(slug);
  if (prev.slug === slug && next.slug === slug) return null;

  return (
    <div className="flex w-full max-w-[1376.8px] items-center justify-between px-6 pt-10 md:px-[72px]">
      <Link
        href={`/work/${prev.slug}`}
        className="text-base tracking-[0.2px] text-ink-soft underline"
      >
        Previous
      </Link>
      <Link
        href={`/work/${next.slug}`}
        className="text-base tracking-[0.2px] text-ink-soft underline"
      >
        Next
      </Link>
    </div>
  );
}
