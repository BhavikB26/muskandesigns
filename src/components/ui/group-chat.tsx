/**
 * A thread with several people in it, each recognisable by their face (21st.dev Group Chat, built on
 * blobatar: github.com/Alain00/blobatar).
 *
 * ## Why a chat is the honest demo of a deterministic avatar
 *
 * Group chat is where "everyone has a picture" stops being cosmetic. Names in
 * a thread are read once and then skipped, so what actually carries who said
 * what is the thing in the left column. A blobatar makes the column
 * informative for free: one prop per person, no upload flow, no default asset,
 * and the same handle produces the same creature everywhere.
 *
 * ## Grouping is done here rather than stored
 *
 * Consecutive messages from one person collapse under one face. That is a
 * presentation rule, not a shape for the data: pass a flat array in order.
 *
 * Local changes, the look otherwise as published: the site's colour tokens instead of shadcn's (this
 * project has no card-foreground / muted-foreground / border tokens), real photos where there are some
 * (`avatars`, blobatars for everyone else), per-person face options (`faces`), and the typing row sits at
 * the bottom of the card so cards of different lengths in a row end alike.
 */
"use client";

import "blobatar/motion.css";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { useMotionPaused } from "@/components/motion";
import { Blobatar } from "@blobatar/react";
import type { BlobatarOptions } from "blobatar";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  /** The seed and the display name. Use an id and pass `title` if the two differ. */
  name: string;
  /** Shown instead of `name`. The face still comes from `name`. */
  title?: string;
  text: string;
  /** Already formatted. Shown small next to the name. */
  time?: string;
};

export type GroupChatProps = {
  messages: ChatMessage[];
  /** The room. Rendered with a `#` in front of it, Slack-style. */
  channel?: string;
  /** Faces for the header, overlapping. Names, not messages. */
  members?: string[];
  /** How many members the pile is not showing. */
  extra?: number;
  /** Whoever is mid-message. Renders the trailing indicator. */
  typing?: string;
  /** What they are typing. The indicator becomes a bubble: wave dots, then this typed out, on a loop. */
  typingText?: string;
  /**
   * Passed to every face in the thread, the pile and the indicator. A house
   * style is a property of the room, not of each message.
   */
  blobatar?: BlobatarOptions;
  /** Per-person additions on top of `blobatar`, keyed by name. */
  faces?: Record<string, BlobatarOptions>;
  /** Real photos, keyed by name. Whoever has one shows it; everyone else gets their blobatar. */
  avatars?: Record<string, string>;
  className?: string;
};

/** Consecutive messages from one person become one group with one face. */
function grouped(messages: ChatMessage[]): ChatMessage[][] {
  return messages.reduce<ChatMessage[][]>((runs, message) => {
    const last = runs.at(-1);
    if (last && last[0]!.name === message.name) last.push(message);
    else runs.push([message]);
    return runs;
  }, []);
}

export function GroupChat({
  messages,
  channel,
  members,
  extra,
  typing,
  typingText,
  blobatar,
  faces,
  avatars,
  className,
}: GroupChatProps) {
  const runs = grouped(messages);
  const face = (name: string) => ({ ...blobatar, ...faces?.[name] });
  const photo = (name: string, className: string) => (
    <Image src={avatars![name]!} alt="" width={120} height={120} unoptimized className={cn("shrink-0 rounded-full object-cover", className)} />
  );

  return (
    <div className={cn("flex w-full flex-col rounded-xl border border-line bg-card text-ink", className)}>
      {(channel || members?.length) && (
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
          {channel ? (
            <span className="font-mono text-sm">
              <span className="text-muted">#</span> {channel}
            </span>
          ) : (
            <span />
          )}

          {/*
            The facepile, and the ring is what makes it one: `background="circle"` plus a ring in the
            card's own colour separates each disc from the one behind it. That is why the card is an
            opaque `bg-card`: the ring has to match something.
          */}
          {members?.length ? (
            <div className="flex items-center" aria-hidden="true">
              {members.map((member) =>
                avatars?.[member] ? (
                  <span key={member} className="-ml-2 flex first:ml-0">
                    {photo(member, "size-7 ring-2 ring-card")}
                  </span>
                ) : (
                  <Blobatar
                    key={member}
                    name={member}
                    background="circle"
                    {...face(member)}
                    alt=""
                    className="-ml-2 size-7 rounded-full ring-2 ring-card first:ml-0"
                  />
                ),
              )}
              {extra ? (
                <span className="-ml-2 grid size-7 place-items-center rounded-full bg-accent-soft font-mono text-[0.6rem] text-muted ring-2 ring-card">
                  +{extra}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 px-5 py-5">
        {runs.map((run) => (
          <div
            // The run's identity, not its author's: one person speaking twice
            // in a thread is two runs.
            key={`${run[0]!.name}-${run[0]!.time ?? ""}-${run.length}`}
            className="flex gap-3"
          >
            {/* `animate="hover"`: a blobatar reacts when pointed at (needs blobatar/motion.css, imported above). */}
            {avatars?.[run[0]!.name] ? (
              photo(run[0]!.name, "size-10")
            ) : (
              <Blobatar
                name={run[0]!.name}
                {...face(run[0]!.name)}
                animate="hover"
                title={`${run[0]!.title ?? run[0]!.name}`}
                className="size-10 shrink-0"
              />
            )}

            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="t-body font-medium">{run[0]!.title ?? run[0]!.name}</span>
                {run[0]!.time ? <span className="font-mono text-[0.7rem] text-muted">{run[0]!.time}</span> : null}
              </div>

              {/* Every message in the run under one name, which is the whole reason to group them. */}
              <div className="mt-1 flex flex-col gap-1">
                {run.map((message) => (
                  <p key={message.text} className="t-body text-ink-soft">
                    {message.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {typing && typingText ? (
          <TypingBubble
            name={typing}
            text={typingText}
            avatar={avatars?.[typing] ? photo(typing, "size-10") : <Blobatar name={typing} {...face(typing)} alt="" className="size-10 shrink-0" />}
          />
        ) : typing ? (
          <div className="mt-auto flex items-center gap-3">
            {/* The same face as when they post, at half opacity: the same person, a moment earlier. */}
            {avatars?.[typing] ? (
              photo(typing, "size-10 opacity-50")
            ) : (
              <Blobatar name={typing} {...face(typing)} alt="" className="size-10 shrink-0 opacity-50" />
            )}
            {/* A polite live region: it waits for a gap rather than interrupting. */}
            <div aria-live="polite" className="flex items-center gap-2 text-xs text-muted">
              {typing} is typing
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const DOTS_MS = 1800; // wave dots before the reply
const CHAR_MS = 75; // per typed letter
const HOLD_MS = 2600; // the finished reply, before it starts over

/**
 * A reply being written: three dots rising and falling in a wave, then the text typed out letter by letter,
 * held, and round again. The face waits half-faded with the dots and comes up to full as the words appear.
 * Runs only while on screen; with reduced or paused motion it is just the text. Screen readers get the
 * finished line once, not every keystroke.
 */
function TypingBubble({ name, text, avatar }: { name: string; text: string; avatar: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const paused = useMotionPaused();
  const still = reduced || paused;
  const [inView, setInView] = useState(false);
  const [shown, setShown] = useState(0); // letters typed; 0 shows the dots

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Whole characters, so an emoji (two UTF-16 units) never shows half-typed.
  const chars = Array.from(text);
  const total = chars.length;

  useEffect(() => {
    if (still || !inView) return;
    let n = 0;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      if (n === 0) setShown(0);
      if (n < total) {
        n++;
        t = setTimeout(() => {
          setShown(n);
          step();
        }, n === 1 ? DOTS_MS : CHAR_MS);
      } else {
        t = setTimeout(() => {
          n = 0;
          step();
        }, HOLD_MS);
      }
    };
    step();
    return () => clearTimeout(t);
  }, [still, inView, total]);

  const typed = still ? text : chars.slice(0, shown).join("");
  const done = still || shown >= total;

  return (
    <div ref={ref} className="mt-auto flex items-center gap-3">
      <div className={cn("flex transition-opacity duration-500 ease-out", typed ? "opacity-100" : "opacity-50")}>{avatar}</div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="sr-only">
          {name}: {text}
        </span>
        <span aria-hidden className="text-xs text-muted">
          {name}
        </span>
        {/* No layout animation here: it scales the box to resize it, which squashes the letters inside. */}
        <div aria-hidden className="flex h-8 w-fit items-center rounded-2xl rounded-tl-md bg-accent-soft px-3.5 text-sm text-ink">
          {typed ? (
            <span className="whitespace-nowrap">
              {typed}
              {!done ? <span className="ml-px inline-block h-[1.05em] w-px translate-y-[0.15em] bg-current" /> : null}
            </span>
          ) : (
            <span className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-accent"
                  animate={{ y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                />
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupChat;
