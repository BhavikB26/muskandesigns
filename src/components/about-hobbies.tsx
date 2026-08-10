import Image from "next/image";
import type { ReactNode } from "react";
import { SparkleIcon } from "./sparkle-icon";

type HobbyProps = {
  image: string;
  imageWidth: number;
  imageHeight: number;
  aspect: string;
  crop: { top: string; left: string; width: string; height: string };
  alt: string;
  imagePaddingX?: boolean;
  children: ReactNode;
};

function Hobby({
  image,
  imageWidth,
  imageHeight,
  aspect,
  crop,
  alt,
  imagePaddingX = false,
  children,
}: HobbyProps) {
  const imageBox = (
    <div
      className="relative h-[90px] shrink-0 overflow-hidden rounded-2xl sm:h-[110px] md:h-[135px]"
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={image}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        className="absolute max-w-none object-cover"
        style={{ top: crop.top, left: crop.left, width: crop.width, height: crop.height }}
      />
    </div>
  );

  return (
    <div className="flex items-center gap-6">
      {imagePaddingX ? (
        <div className="flex shrink-0 items-center px-[15px]">{imageBox}</div>
      ) : (
        imageBox
      )}
      <div className="flex max-w-[221px] flex-col items-start gap-1.5">
        <SparkleIcon />
        <p className="font-urbanist text-xs font-medium tracking-[-0.2px] text-[#212121] sm:text-base">
          {children}
        </p>
      </div>
    </div>
  );
}

export function AboutHobbies() {
  return (
    <section className="flex flex-col items-start gap-10 px-6 sm:gap-12 md:px-0">
      <h2 className="font-urbanist text-xl font-bold text-ink sm:text-[28px]">
        Things I probably didn&rsquo;t need to include
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 md:gap-x-[160px] md:gap-y-[160px]">
        <Hobby
          image="/about/hobby-badminton.png"
          imageWidth={1536}
          imageHeight={1024}
          aspect="200/182"
          crop={{ top: "-38%", left: "-84.85%", width: "232.73%", height: "170.67%" }}
          alt="Playing badminton with friends"
        >
          I&rsquo;m always looking for a excuse to go and play badminton. My
          weekend plans usually look like this with my friends
        </Hobby>

        <Hobby
          image="/about/hobby-headphones.png"
          imageWidth={1536}
          imageHeight={1024}
          aspect="165/181"
          crop={{ top: "-51.54%", left: "-99.27%", width: "298.25%", height: "181.24%" }}
          alt="Headphones"
          imagePaddingX
        >
          I have a soft spot for music filled with light, warmth, and gentle
          flow.
        </Hobby>

        <Hobby
          image="/about/hobby-baking.png"
          imageWidth={1536}
          imageHeight={1024}
          aspect="200/176"
          crop={{ top: "0%", left: "-18.71%", width: "131.85%", height: "100%" }}
          alt="Baking banana bread"
        >
          I&rsquo;m trying to get better at baking. For now, banana bread is
          my strongest performance.
        </Hobby>

        <Hobby
          image="/about/hobby-yoga.png"
          imageWidth={1536}
          imageHeight={1024}
          aspect="200/178"
          crop={{ top: "-14.83%", left: "-35.62%", width: "172.58%", height: "129.62%" }}
          alt="Practising yoga"
        >
          There&rsquo;s something about yoga and meditation that brings me a
          quiet sense of calm.
        </Hobby>
      </div>
    </section>
  );
}
