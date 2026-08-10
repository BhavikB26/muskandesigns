import Image from "next/image";
import type { ReactNode } from "react";

type ProjectCardProps = {
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  // Crop offsets exactly as tuned in the Figma frame, so the baked-in text in
  // these mockup screenshots stays framed the way the design intended.
  crop: { top: string; left: string; width: string; height?: string };
  title: string;
  href: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children: ReactNode;
};

export function ProjectCard({
  image,
  imageWidth,
  imageHeight,
  imageAlt,
  crop,
  title,
  href,
  titleClassName = "text-2xl sm:text-3xl md:text-[32px]",
  descriptionClassName = "text-base sm:text-lg md:text-xl",
  children,
}: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full min-w-0 flex-1 flex-col gap-6 sm:gap-8"
    >
      <div className="relative aspect-[820/600] w-full overflow-hidden rounded-3xl bg-black/5">
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="absolute max-w-none object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ top: crop.top, left: crop.left, width: crop.width, height: crop.height ?? "100%" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className={`font-urbanist font-semibold text-ink ${titleClassName}`}>
          {title}
        </h3>
        <p className={`font-urbanist font-medium leading-relaxed text-muted ${descriptionClassName}`}>
          {children}
        </p>
      </div>
    </a>
  );
}
