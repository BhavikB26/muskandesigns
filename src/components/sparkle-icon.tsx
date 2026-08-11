import Image from "next/image";

export function SparkleIcon({ className = "h-3 w-[9px]" }: { className?: string }) {
  return (
    <Image
      src="/about/icon-star.png"
      alt=""
      width={9}
      height={12}
      className={`shrink-0 object-cover ${className}`}
    />
  );
}
