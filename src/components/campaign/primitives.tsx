import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

const tones = {
  pine: "bg-pine text-card hover:bg-pine-deep",
  alert: "bg-alert text-card hover:bg-ink",
  ghost: "border border-line bg-card text-ink hover:bg-foam",
} as const;

export function OutLink({
  href,
  children,
  tone = "pine",
  icon,
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof tones;
  icon?: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-150 ease-out active:scale-[0.96]",
        tones[tone],
        className,
      )}
    >
      {icon}
      <span>{children}</span>
      {external ? (
        <>
          <ExternalLink className="size-4 shrink-0" aria-hidden />
          <span className="sr-only">، يفتح في تبويب جديد</span>
        </>
      ) : null}
    </a>
  );
}

export function StageHeader({
  index,
  title,
  lede,
}: {
  index: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mb-6 max-w-2xl">
      <p className="text-sm font-semibold text-pine">{index}</p>
      <h2 className="mt-1 text-3xl font-semibold text-ink md:text-4xl" tabIndex={-1}>
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted">{lede}</p>
    </header>
  );
}

export function Meter({
  label,
  value,
  max,
  display,
}: {
  label: string;
  value: number;
  max: number;
  display: string;
}) {
  const pct = Math.max(6, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-sm text-muted">{label}</span>
        <span className="font-display text-lg font-semibold text-ink">{display}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-foam" aria-hidden>
        <div
          className="h-full rounded-full bg-alert transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
