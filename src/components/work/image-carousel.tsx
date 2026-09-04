"use client";

import Image from "next/image";
import { useState } from "react";

export function ImageCarousel({
  images,
  width,
  height,
  caption,
}: {
  images: string[];
  width: number;
  height: number;
  caption?: string;
}) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex w-full flex-col gap-4">
      {caption && (
        <p className="text-lg font-semibold tracking-[0.18px] text-ink-soft">
          {caption}
        </p>
      )}
      <div className="relative w-full overflow-hidden rounded-2xl border border-black/[0.16] shadow-[0px_2px_3px_0px_rgba(48,46,44,0.16)]">
        <div
          className="relative w-full"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <Image
            src={images[index]}
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
          aria-label="Next"
        >
          ›
        </button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/80 px-2 py-1.5">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`size-1.5 rounded-full ${
                i === index ? "bg-ink-soft" : "bg-ink-soft/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
