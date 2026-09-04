import Image from "next/image";
import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 flex w-full justify-center bg-white px-6 py-4 shadow-[0px_0.3px_0.3px_-1.25px_rgba(0,0,0,0.18),0px_1.1px_1.1px_-2.5px_rgba(0,0,0,0.16),0px_5px_5px_-3.75px_rgba(0,0,0,0.06)] md:px-[72px]">
      <div className="flex w-full max-w-[1600px] items-center justify-between">
        <Link href="/" className="relative block size-10 shrink-0 overflow-hidden">
          <Image
            src="/home/nav-logo.png"
            alt="Muskan Designs"
            width={1536}
            height={1024}
            className="absolute left-[-14.72%] top-[9.08%] h-[81.92%] w-[122.88%] max-w-none"
            priority
          />
        </Link>
        <nav className="flex items-center gap-6 text-base text-ink-soft md:gap-10">
          <Link href="/#work" className="flex items-center gap-2 hover:text-ink">
            Case studies
            <img
              src="/home/icon-nav-chevron.svg"
              alt=""
              className="h-1.5 w-3 object-contain"
            />
          </Link>
          <Link href="/#about" className="text-ink hover:text-ink-soft">
            About
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
