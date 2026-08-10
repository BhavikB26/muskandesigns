import Image from "next/image";
import type { ReactNode } from "react";
import { CopyEmailButton } from "./copy-email-button";

const EMAIL = "muskann.designs@gmail.com";

type FooterProps = {
  image: string;
  imageAlt?: string;
  heading: ReactNode;
  ptClassName?: string;
};

export function Footer({
  image,
  imageAlt = "",
  heading,
  ptClassName = "pt-16",
}: FooterProps) {
  return (
    <footer className={`flex flex-col items-center gap-7 px-6 pb-24 text-center sm:gap-10 sm:pb-32 ${ptClassName}`}>
      <div className="relative size-20 sm:size-32 md:size-40">
        <Image src={image} alt={imageAlt} fill className="object-contain" />
      </div>
      <div className="flex max-w-xl flex-col items-center gap-6">
        <p className="font-urbanist text-xl font-bold tracking-tight text-ink sm:text-3xl md:text-[32px]">
          {heading}
        </p>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <p className="font-urbanist text-xs font-medium text-[#7a7a7a] sm:text-xl">
              Send me an email at
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href={`mailto:${EMAIL}`}
                className="font-urbanist text-[10px] font-semibold text-ink sm:text-xl"
              >
                {EMAIL}
              </a>
              <CopyEmailButton email={EMAIL} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-urbanist text-xs font-medium text-[#7a7a7a] sm:text-xl">
              or find me on
            </p>
            <a
              href="https://www.linkedin.com/in/thisismuskan/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-urbanist text-[10px] font-semibold text-ink underline underline-offset-2 sm:text-xl"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
