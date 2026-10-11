import { useEffect, useState } from "react";
import { BookOpen, Check, Copy, Phone, Printer, Smartphone } from "lucide-react";
import {
  ARTICLE_3,
  ARTICLE_5,
  DEFINITION,
  EVIDENCE,
  HABITS,
  IDENTITY,
  LINKS,
  QUIZ,
  REPORT_STEPS,
  STATIONS,
  type StationId,
} from "@/campaign/content";
import { cn } from "@/lib/cn";
import { OutLink } from "@/components/campaign/primitives";
import {
  BoardStage,
  DefineStage,
  EffectsStage,
  LawStage,
  QuizStage,
  ReportStage,
  ScenarioStage,
  ShieldStage,
} from "@/components/campaign/stages";

const EXPLORE = STATIONS.filter((station) => station.id !== "board");

export function CampaignApp({ station, onGo }: { station: StationId; onGo: (id: StationId) => void }) {
  const [seen, setSeen] = useState<StationId[]>([station]);
  const [copied, setCopied] = useState(false);
  const index = STATIONS.findIndex((item) => item.id === station);
  const prev = STATIONS[index - 1];
  const next = STATIONS[index + 1];
  const progress = Math.round((seen.filter((id) => id !== "board").length / EXPLORE.length) * 100);

  useEffect(() => {
    setSeen((current) => (current.includes(station) ? current : [...current, station]));
  }, [station]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [station]);

  async function copyStation() {
    const url = new URL(window.location.href);
    url.searchParams.set("m", station);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="min-h-screen pb-32 lg:pb-10">
      <header className="no-print sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button type="button" onClick={() => onGo("board")} className="flex items-center gap-3 text-start">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-pine font-display text-xs font-semibold text-pine">
              1428
            </span>
            <span>
              <span className="block font-display text-lg font-semibold leading-none text-ink">لا تصمت</span>
              <span className="mt-1 block text-xs text-muted">إنفوجرافيك تفاعلي</span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void copyStation()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-3 text-sm font-semibold text-ink"
            >
              {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              <span className="hidden sm:inline">{copied ? "تم نسخ الرابط" : "رابط المحطة"}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-3 text-sm font-semibold text-ink"
            >
              <Printer className="size-4" aria-hidden />
              <span className="hidden sm:inline">نسخة PDF</span>
            </button>
          </div>
        </div>
        <div className="h-1 bg-line" aria-hidden>
          <div className="h-full bg-pine transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 lg:hidden" aria-label="محطات الحملة">
          {STATIONS.map((item) => (
            <StationPill key={item.id} id={item.id} label={item.label} active={item.id === station} onGo={onGo} />
          ))}
        </nav>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav className="no-print sticky top-28 hidden h-fit space-y-1 lg:block" aria-label="محطات الحملة">
          {STATIONS.map((item) => {
            const on = item.id === station;
            const done = seen.includes(item.id) && item.id !== "board";
            return (
              <button
                key={item.id}
                type="button"
                aria-current={on ? "page" : undefined}
                onClick={() => onGo(item.id)}
                className={cn(
                  "flex min-h-11 w-full items-center gap-3 rounded-2xl px-3 text-start",
                  on ? "bg-pine text-card" : "text-ink hover:bg-foam",
                )}
              >
                <span className={cn("font-display text-xs", on ? "text-card" : "text-pine")}>{item.index}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className={cn("block text-xs", on ? "text-foam" : "text-muted")}>
                    {done && !on ? "شُوهدت" : item.hint}
                  </span>
                </span>
              </button>
            );
          })}
          <div className="mt-4 space-y-2 border-t border-line pt-4">
            <OutLink href={LINKS.play} icon={<Smartphone className="size-4" aria-hidden />} className="w-full">
              كلنا أمن
            </OutLink>
            <OutLink href={LINKS.call999} tone="alert" icon={<Phone className="size-4" aria-hidden />} className="w-full">
              اتصل 999
            </OutLink>
            <OutLink href={LINKS.law} tone="ghost" icon={<BookOpen className="size-4" aria-hidden />} className="w-full">
              نص النظام
            </OutLink>
          </div>
        </nav>

        <main className="no-print min-w-0">
          {station === "board" ? <BoardStage onGo={onGo} /> : null}
          {station === "define" ? <DefineStage /> : null}
          {station === "effects" ? <EffectsStage /> : null}
          {station === "law" ? <LawStage /> : null}
          {station === "shield" ? <ShieldStage /> : null}
          {station === "report" ? <ReportStage /> : null}
          {station === "scenario" ? <ScenarioStage /> : null}
          {station === "quiz" ? <QuizStage /> : null}

          <div className="mt-8 flex flex-wrap gap-2">
            {prev ? (
              <button
                type="button"
                onClick={() => onGo(prev.id)}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink"
              >
                السابق: {prev.label}
              </button>
            ) : null}
            {next ? (
              <button
                type="button"
                onClick={() => onGo(next.id)}
                className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-semibold text-card"
              >
                التالي: {next.label}
              </button>
            ) : null}
          </div>
        </main>
      </div>

      <footer className="no-print fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2">
          <OutLink href={LINKS.play} icon={<Smartphone className="size-4" aria-hidden />} className="flex-1 sm:flex-none">
            كلنا أمن
          </OutLink>
          <OutLink href={LINKS.call999} tone="alert" icon={<Phone className="size-4" aria-hidden />} className="flex-1 sm:flex-none">
            999
          </OutLink>
          <OutLink href={LINKS.law} tone="ghost" icon={<BookOpen className="size-4" aria-hidden />} className="flex-1 sm:flex-none">
            نص النظام
          </OutLink>
          <p className="hidden text-xs text-muted md:block">
            {IDENTITY.student} · {IDENTITY.studentId} · د. {IDENTITY.doctor} · شعبة {IDENTITY.section}
          </p>
        </div>
      </footer>

      <PrintSheet />
    </div>
  );
}

function StationPill({
  id,
  label,
  active,
  onGo,
}: {
  id: StationId;
  label: string;
  active: boolean;
  onGo: (id: StationId) => void;
}) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={() => onGo(id)}
      className={cn(
        "shrink-0 rounded-full px-3 py-2 text-sm font-semibold",
        active ? "bg-pine text-card" : "bg-card text-ink",
      )}
    >
      {label}
    </button>
  );
}

function PrintSheet() {
  return (
    <article className="print-sheet hidden px-8 py-8 text-ink">
      <p className="text-sm">
        {IDENTITY.college} — {IDENTITY.university}
      </p>
      <h1 className="mt-2 text-4xl font-semibold">لا تصمت: القوانين والعقوبات للابتزاز الإلكتروني</h1>
      <p className="mt-2 text-sm">
        {IDENTITY.student} · {IDENTITY.studentId} · د. {IDENTITY.doctor} · الشعبة {IDENTITY.section} · {IDENTITY.audience}
      </p>
      <h2 className="mt-6 text-2xl font-semibold">التعريف</h2>
      <p className="mt-2">{DEFINITION}</p>
      <h2 className="mt-6 text-2xl font-semibold">العقوبات حسب نص النظام</h2>
      <p className="mt-2">
        {ARTICLE_3.article}: {ARTICLE_3.prisonLabel} و{ARTICLE_3.fineLabel}، {ARTICLE_3.rule}. {ARTICLE_3.summary}
      </p>
      <p className="mt-2">
        {ARTICLE_5.article}: {ARTICLE_5.prisonLabel} و{ARTICLE_5.fineLabel}، {ARTICLE_5.rule}. {ARTICLE_5.summary}
      </p>
      <p className="mt-2">
        نص النظام:{" "}
        <a href={LINKS.law}>{LINKS.law}</a>
      </p>
      <h2 className="mt-6 text-2xl font-semibold">الوقاية</h2>
      <ul className="mt-2 list-disc pe-5">
        {HABITS.map((habit) => (
          <li key={habit.id}>
            {habit.title} — {habit.why}
          </li>
        ))}
      </ul>
      <h2 className="mt-6 text-2xl font-semibold">الإبلاغ</h2>
      <ol className="mt-2 list-decimal pe-5">
        {REPORT_STEPS.map((step) => (
          <li key={step.title}>
            {step.title}: {step.body}
          </li>
        ))}
      </ol>
      <ul className="mt-3 space-y-1">
        {EVIDENCE.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-4">
        كلنا أمن لأندرويد: <a href={LINKS.play}>{LINKS.play}</a>
      </p>
      <p className="mt-2">
        كلنا أمن لآيفون: <a href={LINKS.apple}>{LINKS.apple}</a>
      </p>
      <p className="mt-2">
        اتصال 911: <a href={LINKS.call911}>911</a> — اتصال 999 لبيشة وعسير: <a href={LINKS.call999}>999</a>
      </p>
      <h2 className="mt-6 text-2xl font-semibold">أسئلة المراجعة</h2>
      <ol className="mt-2 list-decimal pe-5">
        {QUIZ.map((question) => (
          <li key={question.prompt} className="mt-2">
            {question.prompt} — {question.choices[question.answer]}
          </li>
        ))}
      </ol>
    </article>
  );
}
