import { useEffect, useState } from "react";
import {
  Banknote,
  BookOpen,
  Check,
  Copy,
  EyeOff,
  FileX,
  HeartPulse,
  Lock,
  MessageSquareWarning,
  Phone,
  RotateCcw,
  Scale,
  ShieldAlert,
  Smartphone,
  Users,
} from "lucide-react";
import {
  ARTICLE_3,
  ARTICLE_5,
  DEFINITION,
  EFFECTS,
  EVIDENCE,
  HABITS,
  IDENTITY,
  LINKS,
  QUIZ,
  REPORT_STEPS,
  SCALE,
  TERMS,
  type StationId,
} from "@/campaign/content";
import { cn } from "@/lib/cn";
import { Meter, OutLink, StageHeader } from "@/components/campaign/primitives";

const HABIT_KEY = "la-tasmut-habits-v1";

type Go = (id: StationId) => void;

const HOTSPOTS: { id: StationId; title: string; fact: string; art: string }[] = [
  { id: "define", title: "التعريف", fact: "تهديد مقابل مال أو خضوع", art: "/art/sticker-phone.jpg" },
  { id: "effects", title: "الآثار", fact: "نفس، سمعة، ودليل يضيع", art: "/art/sticker-calm.jpg" },
  { id: "law", title: "العقوبات", fact: "مادة 3 ومادة 5 بنص النظام", art: "/art/sticker-law.jpg" },
  { id: "shield", title: "الوقاية", fact: "خمس عادات تحفظك", art: "/art/sticker-shield.jpg" },
  { id: "report", title: "الإبلاغ", fact: "كلنا أمن و911 و999", art: "/art/sticker-report.jpg" },
  { id: "scenario", title: "موقف", fact: "رسالة تهديد… ماذا تفعل؟", art: "/art/sticker-phone.jpg" },
  { id: "quiz", title: "اختبر نفسك", fact: "خمس أسئلة ثم النتيجة", art: "/art/sticker-law.jpg" },
];

const DIAL = [
  { id: "blackmail", label: "ابتزاز", article: ARTICLE_3, clause: "تهديد لنزع مال أو فرض فعل" },
  { id: "defame", label: "تشهير", article: ARTICLE_3, clause: "نشر يضر بالآخرين عبر التقنية" },
  { id: "leak", label: "تسريب", article: ARTICLE_5, clause: "إلغاء بيانات خاصة أو إعادة نشرها" },
] as const;

export function BoardStage({ onGo }: { onGo: Go }) {
  const [dial, setDial] = useState<(typeof DIAL)[number]["id"]>("blackmail");
  const active = DIAL.find((item) => item.id === dial) ?? DIAL[0];

  return (
    <div className="space-y-6">
      <figure className="relative overflow-hidden rounded-card border border-line">
        <img
          src="/art/hero.jpg"
          alt="درع يحمي الحرم الجامعي من تهديد الهاتف"
          className="h-52 w-full object-cover sm:h-72"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-card/95 px-3 py-2">
          <a href={LINKS.university} target="_blank" rel="noopener noreferrer" className="min-w-0">
            <img src="/brands/ub-logo.svg" alt="شعار جامعة بيشة" className="h-12 w-auto max-w-48 object-contain sm:h-14" />
          </a>
          <a href={LINKS.nca} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img
              src="/brands/nca-logo.png"
              alt="شعار الهيئة الوطنية للأمن السيبراني"
              className="h-16 w-auto object-contain sm:h-20"
            />
          </a>
        </div>
      </figure>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <p className="text-sm font-semibold text-pine">
          {IDENTITY.college} · {IDENTITY.university}
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-ink md:text-6xl">لا تصمت</h1>

        <div className="mt-6 rounded-card border border-line bg-card p-4">
          <p className="text-sm font-semibold text-muted">اضغط نوع الجريمة لترى حدها الأعلى</p>
          <div className="mt-3 grid grid-cols-3 gap-2" role="tablist" aria-label="نوع الجريمة">
            {DIAL.map((item) => {
              const on = item.id === dial;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setDial(item.id)}
                  className={cn(
                    "min-h-11 rounded-full text-sm font-semibold transition-colors",
                    on ? "bg-pine text-card" : "bg-foam text-ink",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4" aria-live="polite">
            <div>
              <p className="font-display text-4xl font-semibold text-ink md:text-5xl">{active.article.prisonLabel}</p>
              <p className="mt-1 text-sm text-muted">سجن</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-ink md:text-4xl">{active.article.fineLabel}</p>
              <p className="mt-1 text-sm text-muted">أو غرامة · {active.article.article}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{active.clause}. {active.article.rule}.</p>
          <div className="mt-4">
            <Meter
              label="السجن مقارنة بحد المادة 5"
              value={active.article.prisonYears}
              max={SCALE.prison}
              display={active.article.prisonLabel}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <OutLink href={LINKS.play} icon={<Smartphone className="size-4" aria-hidden />}>
            كلنا أمن · أندرويد
          </OutLink>
          <OutLink href={LINKS.apple} tone="ghost" icon={<Smartphone className="size-4" aria-hidden />}>
            كلنا أمن · آيفون
          </OutLink>
          <OutLink href={LINKS.law} tone="ghost" icon={<BookOpen className="size-4" aria-hidden />}>
            نص النظام
          </OutLink>
        </div>
      </div>

      <div>
        <ol className="grid grid-cols-2 gap-3">
          {HOTSPOTS.map((spot, index) => (
            <li key={spot.id} className={spot.id === "quiz" ? "col-span-2" : undefined}>
              <button
                type="button"
                onClick={() => onGo(spot.id)}
                className="flex h-full min-h-20 w-full items-center gap-3 rounded-card border border-line bg-card px-3 py-3 text-start transition-transform duration-150 ease-out hover:border-pine active:scale-[0.96]"
              >
                <img src={spot.art} alt="" className="size-16 shrink-0 rounded-2xl object-cover" />
                <span className="min-w-0">
                  <span className="font-display text-sm font-semibold text-pine">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block text-lg font-semibold text-ink">{spot.title}</span>
                  <span className="block text-sm text-muted">{spot.fact}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-card border border-line bg-foam px-4 py-4 text-sm">
          <div>
            <dt className="text-muted">الطالبة</dt>
            <dd className="font-semibold text-ink">{IDENTITY.student}</dd>
          </div>
          <div>
            <dt className="text-muted">الرقم الجامعي</dt>
            <dd className="font-semibold text-ink">{IDENTITY.studentId}</dd>
          </div>
          <div>
            <dt className="text-muted">الدكتورة</dt>
            <dd className="font-semibold text-ink">{IDENTITY.doctor}</dd>
          </div>
          <div>
            <dt className="text-muted">الشعبة</dt>
            <dd className="font-semibold text-ink">{IDENTITY.section}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted">الفئة المستهدفة</dt>
            <dd className="font-semibold text-ink">{IDENTITY.audience}</dd>
          </div>
        </dl>
      </div>
    </div>
    </div>
  );
}

export function DefineStage() {
  const [term, setTerm] = useState(TERMS[0]?.id ?? "threat");
  const active = TERMS.find((item) => item.id === term) ?? TERMS[0];

  return (
    <div>
      <StageHeader
        index="01 — التعريف"
        title="ما الابتزاز الإلكتروني؟"
        art="/art/sticker-phone.jpg"
        artAlt="ملصق هاتف مكسور السلسلة"
      />
      <p className="max-w-3xl text-xl leading-loose text-ink md:text-2xl">
        الابتزاز الإلكتروني هو{" "}
        <TermButton id="threat" current={term} onPick={setTerm} /> شخص بنشر{" "}
        <TermButton id="media" current={term} onPick={setTerm} /> عبر{" "}
        <TermButton id="cyber" current={term} onPick={setTerm} /> بهدف{" "}
        <TermButton id="money" current={term} onPick={setTerm} /> أو{" "}
        <TermButton id="demand" current={term} onPick={setTerm} />.
      </p>
      {active ? (
        <div className="mt-6 max-w-2xl rounded-card border border-pine bg-foam px-5 py-4" aria-live="polite">
          <h3 className="text-lg font-semibold text-pine">{active.label}</h3>
          <p className="mt-2 leading-relaxed text-ink">{active.body}</p>
        </div>
      ) : null}
      <p className="mt-4 max-w-2xl text-sm text-muted">{DEFINITION}</p>
    </div>
  );
}

function TermButton({
  id,
  current,
  onPick,
}: {
  id: string;
  current: string;
  onPick: (id: string) => void;
}) {
  const term = TERMS.find((item) => item.id === id);
  if (!term) return null;
  const on = current === id;
  return (
    <button
      type="button"
      onClick={() => onPick(id)}
      aria-pressed={on}
      className={cn(
        "inline rounded-md px-1 font-semibold underline decoration-2 underline-offset-4 transition-colors",
        on ? "bg-pine text-card decoration-card" : "text-pine decoration-pine/40 hover:bg-foam",
      )}
    >
      {term.label}
    </button>
  );
}

const EFFECT_ICON = {
  anxiety: HeartPulse,
  isolate: Users,
  fear: EyeOff,
  reputation: MessageSquareWarning,
  money: Banknote,
  evidence: FileX,
  reply: ShieldAlert,
} as const;

export function EffectsStage() {
  const [id, setId] = useState(EFFECTS[0]?.id ?? "anxiety");
  const active = EFFECTS.find((item) => item.id === id) ?? EFFECTS[0];
  const groups = ["نفسية واجتماعية", "قانونية ومالية"] as const;

  return (
    <div>
      <StageHeader
        index="02 — الآثار"
        title="ماذا يخلّف الابتزاز؟"
        art="/art/sticker-calm.jpg"
        artAlt="ملصق التعافي من العزلة"
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <div className="space-y-5">
          {groups.map((group) => (
            <div key={group}>
              <h3 className="mb-2 text-sm font-semibold text-muted">{group}</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {EFFECTS.filter((item) => item.group === group).map((item) => {
                  const Icon = EFFECT_ICON[item.id as keyof typeof EFFECT_ICON] ?? ShieldAlert;
                  const on = item.id === id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setId(item.id)}
                      className={cn(
                        "flex min-h-14 items-center gap-3 rounded-2xl border px-3 py-2 text-start transition-colors",
                        on ? "border-pine bg-pine text-card" : "border-line bg-card text-ink hover:bg-foam",
                      )}
                    >
                      <Icon className="size-5 shrink-0" aria-hidden />
                      <span className="font-semibold">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {active ? (
          <aside className="h-fit rounded-card border border-line bg-card p-5" aria-live="polite">
            <p className="text-sm font-semibold text-pine">{active.group}</p>
            <h3 className="mt-1 text-2xl font-semibold text-ink">{active.title}</h3>
            <p className="mt-3 leading-relaxed text-ink">{active.body}</p>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

export function LawStage() {
  const articles = [ARTICLE_3, ARTICLE_5];
  const [articleId, setArticleId] = useState<(typeof articles)[number]["id"]>("a3");
  const article = articles.find((item) => item.id === articleId) ?? ARTICLE_3;
  const [clauseId, setClauseId] = useState(article.clauses[0]?.id ?? "");
  const clause = article.clauses.find((item) => item.id === clauseId) ?? article.clauses[0];

  function pickArticle(next: string) {
    const found = articles.find((item) => item.id === next) ?? ARTICLE_3;
    setArticleId(found.id);
    setClauseId(found.clauses[0]?.id ?? "");
  }

  return (
    <div>
      <StageHeader
        index="03 — القوانين والعقوبات"
        title="نظام مكافحة الجرائم المعلوماتية"
        art="/art/sticker-law.jpg"
        artAlt="ملصق ميزان العدالة"
      />
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="مواد النظام">
        {articles.map((item) => {
          const on = item.id === articleId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => pickArticle(item.id)}
              className={cn(
                "min-h-11 rounded-full px-4 text-sm font-semibold",
                on ? "bg-ink text-card" : "bg-card text-ink border border-line",
              )}
            >
              {item.article}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="space-y-2">
          {article.clauses.map((item) => {
            const on = item.id === clause?.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => setClauseId(item.id)}
                className={cn(
                  "block w-full rounded-2xl border px-4 py-3 text-start",
                  on ? "border-pine bg-foam" : "border-line bg-card hover:bg-foam",
                )}
              >
                <span className="font-semibold text-ink">{item.title}</span>
              </button>
            );
          })}
          {clause ? (
            <blockquote className="rounded-card border border-line bg-card px-4 py-4 text-base leading-relaxed text-ink">
              «{clause.text}»
              <footer className="mt-3 text-sm text-muted">{article.article} · نظام مكافحة الجرائم المعلوماتية</footer>
            </blockquote>
          ) : null}
        </div>
        <div className="rounded-card border border-line bg-card p-5" aria-live="polite">
          <p className="text-sm font-semibold text-alert">{article.article}</p>
          <p className="mt-2 font-display text-4xl font-semibold text-ink">{article.prisonLabel}</p>
          <p className="mt-1 text-lg font-semibold text-ink">{article.fineLabel}</p>
          <p className="text-sm text-muted">{article.rule}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{article.summary}</p>
          <div className="mt-5 space-y-4">
            <Meter label="السجن" value={article.prisonYears} max={SCALE.prison} display={article.prisonLabel} />
            <Meter label="الغرامة" value={article.fine} max={SCALE.fine} display={article.fineLabel} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <OutLink href={LINKS.law} icon={<Scale className="size-4" aria-hidden />}>
              افتح النص على هيئة الخبراء
            </OutLink>
            <OutLink href={LINKS.moi} tone="ghost">
              وزارة الداخلية
            </OutLink>
          </div>
        </div>
      </div>

      <details className="mt-6 max-w-3xl rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-relaxed">
        <summary className="cursor-pointer font-semibold text-ink">لماذا تختلف بعض الأرقام المتداولة؟</summary>
        <p className="mt-2 text-muted">
          بعض المطويات تكتب «سجن سنة أو غرامة مليون» أو تنسب إلى المادة 7 عقوبة ثلاث سنوات ومليون ريال.
          النص المنشور يضع الابتزاز والتهديد والتشهير في المادة 3: سجن لا يزيد على سنة وغرامة لا تزيد على
          خمسمائة ألف ريال، أو إحداهما. إذا سرّب الجاني بيانات خاصة أو أعاد نشرها فالعقوبة في المادة 5 تصل
          إلى أربع سنوات وثلاثة ملايين. المادة 7 تخص جرائم أمن الدولة، وليست عقوبة الابتزاز في هذه الحملة.
        </p>
      </details>
    </div>
  );
}

export function ShieldStage() {
  const [checked, setChecked] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HABIT_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
        setChecked(parsed);
      }
    } catch {
      /* ignore broken local storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(HABIT_KEY, JSON.stringify(checked));
  }, [checked, hydrated]);

  const [open, setOpen] = useState(HABITS[0]?.id ?? "secrets");
  const active = HABITS.find((item) => item.id === open);
  const done = checked.length;

  function toggle(id: string) {
    setChecked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    setOpen(id);
  }

  return (
    <div>
      <StageHeader
        index="04 — الوقاية"
        title="خمس عادات تحميك"
        art="/art/sticker-shield.jpg"
        artAlt="ملصق ترس الحماية"
      />
      <p className="mb-4 font-display text-3xl font-semibold text-ink" aria-live="polite">
        {done} من {HABITS.length}
      </p>
      <div
        className="mb-5 h-2.5 overflow-hidden rounded-full bg-foam"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={HABITS.length}
        aria-valuenow={done}
      >
        <div
          className="h-full rounded-full bg-pine transition-[width] duration-300 ease-out"
          style={{ width: `${(done / HABITS.length) * 100}%` }}
        />
      </div>
      <ul className="space-y-2">
        {HABITS.map((habit) => {
          const on = checked.includes(habit.id);
          const shown = open === habit.id;
          return (
            <li key={habit.id} className="rounded-2xl border border-line bg-card">
              <div className="flex items-stretch">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(habit.id)}
                  className="grid min-h-14 min-w-14 place-items-center border-e border-line"
                >
                  <span
                    className={cn(
                      "grid size-7 place-items-center rounded-full border",
                      on ? "border-pine bg-pine text-card" : "border-line text-transparent",
                    )}
                  >
                    <Check className="size-4" aria-hidden />
                  </span>
                  <span className="sr-only">{on ? "معلَّمة كعادة مطبّقة" : "علّم هذه العادة"}</span>
                </button>
                <button
                  type="button"
                  aria-expanded={shown}
                  onClick={() => setOpen(habit.id)}
                  className="flex-1 px-4 py-3 text-start font-semibold text-ink"
                >
                  {habit.title}
                </button>
              </div>
              {shown ? <p className="border-t border-line px-4 py-3 text-sm leading-relaxed text-muted">{habit.why}</p> : null}
            </li>
          );
        })}
      </ul>
      {active && done === HABITS.length ? (
        <p className="mt-4 rounded-2xl bg-foam px-4 py-3 text-sm font-semibold text-pine">
          اكتملت العادات الخمس. إن وقع الابتزاز رغم ذلك، الخطوة التالية إبلاغ لا صمت.
        </p>
      ) : null}
    </div>
  );
}

export function ReportStage() {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = REPORT_STEPS[step];

  async function copyEvidence() {
    const text = ["ماذا أحفظ قبل البلاغ:", ...EVIDENCE.map((item, index) => `${index + 1}. ${item}`)].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <StageHeader
        index="05 — الإبلاغ"
        title="أبلغ فورًا ولا تتأخر"
        art="/art/sticker-report.jpg"
        artAlt="ملصق حفظ الدليل والإبلاغ"
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <OutLink href={LINKS.play} icon={<Smartphone className="size-4" aria-hidden />} className="w-full">
          افتح كلنا أمن على أندرويد
        </OutLink>
        <OutLink href={LINKS.apple} icon={<Smartphone className="size-4" aria-hidden />} className="w-full">
          افتح كلنا أمن على آيفون
        </OutLink>
        <OutLink href={LINKS.call911} tone="alert" icon={<Phone className="size-4" aria-hidden />} className="w-full">
          اتصل 911
        </OutLink>
        <OutLink href={LINKS.call999} tone="alert" icon={<Phone className="size-4" aria-hidden />} className="w-full">
          اتصل 999 · بيشة وعسير
        </OutLink>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        911 للطوارئ في الرياض ومكة المكرمة والمدينة المنورة والشرقية. في بقية المناطق، ومنها منطقة عسير حيث تقع بيشة،
        رقم الشرطة 999. تطبيق كلنا أمن من الأمن العام، ويُحمَّل من المتجر الرسمي فقط.
      </p>

      <ol className="mt-6 grid gap-2 sm:grid-cols-4">
        {REPORT_STEPS.map((item, index) => {
          const on = index === step;
          return (
            <li key={item.title}>
              <button
                type="button"
                aria-current={on ? "step" : undefined}
                onClick={() => setStep(index)}
                className={cn(
                  "flex min-h-20 w-full flex-col items-start rounded-2xl border px-3 py-3 text-start",
                  on ? "border-pine bg-pine text-card" : "border-line bg-card text-ink",
                )}
              >
                <span className="font-display text-sm">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-1 font-semibold">{item.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {current ? (
        <p className="mt-4 max-w-2xl rounded-card border border-line bg-card px-4 py-4 leading-relaxed text-ink" aria-live="polite">
          {current.body}
        </p>
      ) : null}

      <div className="mt-6 rounded-card border border-line bg-foam p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-ink">ماذا أحفظ؟</h3>
          <button
            type="button"
            onClick={() => void copyEvidence()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink active:scale-[0.96]"
          >
            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? "تم نسخ القائمة" : "انسخ قائمة الأدلة"}
          </button>
        </div>
        <ul className="mt-3 space-y-2">
          {EVIDENCE.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink">
              <Lock className="mt-0.5 size-4 shrink-0 text-pine" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type Path = "inbox" | "paid" | "deleted" | "saved";

const OUTCOMES: Record<Exclude<Path, "inbox">, { title: string; body: string; tone: "bad" | "good" }> = {
  paid: {
    title: "الدفع لا يغلق الملف",
    body: "التحويل يثبت أن التهديد نجح، والمطلب التالي غالبًا أكبر. توقف الآن، واحفظ ما بقي من المحادثة، ثم بلّغ. العقوبة على المبتز لا تسقط لأنك دفعت.",
    tone: "bad",
  },
  deleted: {
    title: "الحذف يضيع أقوى دليل",
    body: "ذهبت لقطة النص والوقت والحساب. لا ترد بمحتوى جديد، ولا تنشر أنت أيضًا. إن بقي اسم أو رقم أو إشعار فاحفظه وبلّغ فورًا.",
    tone: "bad",
  },
  saved: {
    title: "هذا المسار الذي يحميك",
    body: "لا تدفع، لا تحذف، لا تتفاوض. وثّق الشاشة والرابط واسم الحساب، ثم أرسل البلاغ عبر كلنا أمن. في بيشة وعسير اتصل 999، وفي مناطق 911 اتصل 911.",
    tone: "good",
  },
};

export function ScenarioStage() {
  const [path, setPath] = useState<Path>("inbox");
  const outcome = path === "inbox" ? null : OUTCOMES[path];

  return (
    <div>
      <StageHeader
        index="06 — موقف تفاعلي"
        title="وصلك هذا التهديد. ماذا تفعل؟"
        art="/art/sticker-phone.jpg"
        artAlt="ملصق رفض الابتزاز"
      />
      <div className="mx-auto max-w-md rounded-[1.75rem] border border-ink bg-ink p-3 text-card">
        <div className="rounded-[1.25rem] bg-pine-deep px-4 py-4">
          <div className="mb-4 flex items-center justify-between text-xs text-foam">
            <span>رقم مجهول</span>
            <span>الآن</span>
          </div>
          <div className="rounded-2xl rounded-se-md bg-card px-4 py-3 leading-relaxed text-ink">
            عندي صور ومقاطع تخصك. حوّل 500 ريال خلال ساعة وإلا نشرتها على حساباتك.
          </div>
          <p className="mt-3 text-xs text-foam">رسالة واردة · لا ترد عليها من هنا</p>
        </div>
      </div>

      {path === "inbox" ? (
        <div className="mx-auto mt-4 grid max-w-md gap-2">
          <Choice onClick={() => setPath("paid")}>أحوّل المبلغ الآن حتى يسكت</Choice>
          <Choice onClick={() => setPath("deleted")}>أحذف المحادثة وأقفل الجوال</Choice>
          <Choice onClick={() => setPath("saved")} strong>
            أصوّر الشاشة وأبلّغ ولا أدفع
          </Choice>
        </div>
      ) : outcome ? (
        <div className="mx-auto mt-4 max-w-md" aria-live="polite">
          <div
            className={cn(
              "rounded-card border px-4 py-4",
              outcome.tone === "good" ? "border-pine bg-foam" : "border-alert bg-alert-soft",
            )}
          >
            <h3 className="text-xl font-semibold text-ink">{outcome.title}</h3>
            <p className="mt-2 leading-relaxed text-ink">{outcome.body}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <OutLink href={LINKS.play}>بلّغ عبر كلنا أمن</OutLink>
            <OutLink href={LINKS.call999} tone="alert" icon={<Phone className="size-4" aria-hidden />}>
              999
            </OutLink>
            <button
              type="button"
              onClick={() => setPath("inbox")}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink active:scale-[0.96]"
            >
              <RotateCcw className="size-4" aria-hidden />
              جرّب مسارًا آخر
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Choice({
  children,
  onClick,
  strong = false,
}: {
  children: string;
  onClick: () => void;
  strong?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-12 rounded-2xl px-4 text-start text-sm font-semibold active:scale-[0.96]",
        strong ? "bg-pine text-card" : "border border-line bg-card text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function QuizStage() {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUIZ.reduce((sum, question, index) => sum + (picks[index] === question.answer ? 1 : 0), 0);
  const complete = QUIZ.every((_, index) => picks[index] !== undefined);

  function retry() {
    setPicks({});
    setSubmitted(false);
  }

  return (
    <div>
      <StageHeader
        index="07 — اختبر"
        title="هل تملك الإجابة قبل أن تحتاجها؟"
        art="/art/sticker-law.jpg"
        artAlt="ملصق ميزان العدالة"
      />
      <ol className="space-y-5">
        {QUIZ.map((question, qIndex) => (
          <li key={question.prompt} className="rounded-card border border-line bg-card p-4">
            <p className="font-semibold text-ink">
              {qIndex + 1}. {question.prompt}
            </p>
            <div className="mt-3 grid gap-2">
              {question.choices.map((choice, cIndex) => {
                const picked = picks[qIndex] === cIndex;
                const correct = submitted && cIndex === question.answer;
                const wrong = submitted && picked && cIndex !== question.answer;
                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={submitted}
                    aria-pressed={picked}
                    onClick={() => setPicks((current) => ({ ...current, [qIndex]: cIndex }))}
                    className={cn(
                      "min-h-11 rounded-2xl border px-3 py-2 text-start text-sm",
                      correct && "border-pine bg-foam",
                      wrong && "border-alert bg-alert-soft",
                      !submitted && picked && "border-pine bg-foam",
                      !submitted && !picked && "border-line bg-paper",
                      submitted && !correct && !wrong && "border-line opacity-70",
                    )}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            {submitted ? <p className="mt-3 text-sm leading-relaxed text-muted">{question.why}</p> : null}
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            disabled={!complete}
            onClick={() => setSubmitted(true)}
            className="inline-flex min-h-11 items-center rounded-full bg-pine px-5 text-sm font-semibold text-card disabled:opacity-40"
          >
            اعرض النتيجة
          </button>
        ) : (
          <>
            <p className="font-display text-3xl font-semibold text-ink" aria-live="polite">
              {score} / {QUIZ.length}
            </p>
            <button
              type="button"
              onClick={retry}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink"
            >
              <RotateCcw className="size-4" aria-hidden />
              أعد الاختبار
            </button>
          </>
        )}
      </div>
      {submitted && score === QUIZ.length ? (
        <p className="mt-4 rounded-2xl bg-pine px-4 py-3 font-semibold text-card">
          إجابات كاملة. الخطوة التالية إن وقع تهديد: احفظ الدليل وافتح كلنا أمن، ولا تصمت.
        </p>
      ) : null}
    </div>
  );
}
