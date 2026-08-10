import Image from "next/image";

export function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/about/icon-star.png"
      alt=""
      width={15}
      height={20}
      className={`h-5 w-[15px] shrink-0 object-cover ${className}`}
    />
  );
}
