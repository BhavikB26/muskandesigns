import { MaskedText } from "@/components/masked-text";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer id="contact" className="w-full scroll-mt-20 px-page pb-fr-xl pt-fr-section md:pt-[144px]">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-fr-lg">
        <div data-reveal className="flex flex-col gap-fr-xxl rounded-fr-xl bg-surface-1 p-6 sm:p-fr-xxl md:p-16">
          <div className="flex flex-col gap-fr-md">
            <p className="label-mono text-muted">Contact</p>
            <h2 className="t-display-xxl">
              <MaskedText text="Let’s" onReveal />{" "}
              <em className="font-serif text-[0.96em] font-normal italic tracking-[-0.03em] text-ink">
                <MaskedText text="talk." start={1} onReveal />
              </em>
            </h2>
            <p className="t-body-lg max-w-[460px] text-ink">
              I&rsquo;m looking for Product Designer and UX Designer roles. The fastest way to reach me is LinkedIn.
            </p>
          </div>
          <SocialLinks onCard />
        </div>
        <p className="t-caption px-fr-xs text-muted">© {new Date().getFullYear()} Muskan Bhatia</p>
      </div>
    </footer>
  );
}
