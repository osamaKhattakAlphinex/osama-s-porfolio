"use client";

import { useState } from "react";
import { formEndpoint, person } from "@/content/site";

type Fields = { name: string; email: string; kind: string; when: string; message: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const empty: Fields = { name: "", email: "", kind: "", when: "", message: "" };
const kinds = ["Web app or SaaS", "Next.js / React site", "API or back end", "Improve an existing app", "WordPress or SEO", "Full-time role"];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell me your name.";
  if (!f.email.trim()) e.email = "I need an email address to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "That email address looks incomplete.";
  if (f.message.trim().length < 20) e.message = "A sentence or two (20+ characters) helps me reply usefully.";
  return e;
}

/**
 * Posts to Formspree. `full` adds the project-type chips and timeline (contact page);
 * the home page uses the shorter version with a select.
 */
export function ContactForm({ full = false, title, headingLevel = 2 }: { full?: boolean; title: string; headingLevel?: 2 | 3 }) {
  const [f, setF] = useState<Fields>(empty);
  const [e, setE] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const H = `h${headingLevel}` as const;
  const p = full ? "c" : "f";

  const set = (k: keyof Fields, v: string) => {
    setF((prev) => ({ ...prev, [k]: v }));
    if (k in e) setE((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status === "sending") return;
    const errs = validate(f);
    if (Object.values(errs).some(Boolean)) {
      setE(errs);
      const first = (["name", "email", "message"] as const).find((k) => errs[k]);
      document.getElementById(`${p}-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const body = new FormData(ev.currentTarget);
      body.set("kind", f.kind);
      body.set("_subject", `Portfolio enquiry from ${f.name.trim()}${f.kind ? ` (${f.kind})` : ""}`);
      const res = await fetch(formEndpoint, { method: "POST", body, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const input = (bad?: string) =>
    `w-full min-h-12 rounded-[10px] border-[1.5px] bg-surface px-3.5 py-3 text-ink transition-colors placeholder:text-muted/80 hover:border-ghost focus:border-accent focus:outline-none ${
      bad ? "border-danger" : "border-rule-2"
    }`;

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-3.5 py-6">
        <span className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-ok-bg text-ok-ink">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m5 12 5 5 9-10" />
          </svg>
        </span>
        <H className="heading text-[1.625rem]">Message sent. Thank you, {f.name.trim().split(" ")[0] || "friend"}.</H>
        <p className="text-muted">I read every message myself and will reply to {f.email.trim()}.</p>
        <button
          type="button"
          onClick={() => {
            setF(empty);
            setStatus("idle");
          }}
          className="mt-2 min-h-12 rounded-xl border-[1.5px] border-ghost bg-surface px-4.5 font-semibold text-ink hover:border-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  const msgLen = f.message.trim().length;

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={`${p}-title`} className="flex flex-col gap-5">
      <H id={`${p}-title`} className="heading text-[1.5rem] md:text-[1.625rem]">
        {title}
      </H>

      {/* Spam trap: real visitors never see or fill this. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={`${p}-name`} label="Your name" error={e.name}>
          <input id={`${p}-name`} name="name" type="text" autoComplete="name" value={f.name} onChange={(ev) => set("name", ev.target.value)} aria-invalid={!!e.name} aria-describedby={e.name ? `${p}-name-err` : undefined} className={input(e.name)} />
        </Field>
        <Field id={`${p}-email`} label="Email" error={e.email}>
          <input id={`${p}-email`} name="email" type="email" autoComplete="email" value={f.email} onChange={(ev) => set("email", ev.target.value)} aria-invalid={!!e.email} aria-describedby={e.email ? `${p}-email-err` : undefined} className={input(e.email)} />
        </Field>
      </div>

      {full ? (
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-2.5 text-sm font-semibold">What do you need?</legend>
          <div className="flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={f.kind === k}
                onClick={() => set("kind", f.kind === k ? "" : k)}
                className={`min-h-10 rounded-[10px] border-[1.5px] px-3.5 text-sm transition-colors ${
                  f.kind === k ? "border-accent bg-accent-soft font-semibold text-accent-soft-ink" : "border-rule-2 bg-surface font-medium text-ink-2 hover:border-ink"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </fieldset>
      ) : (
        <Field id={`${p}-kind`} label="What do you need?">
          <select id={`${p}-kind`} value={f.kind} onChange={(ev) => set("kind", ev.target.value)} className={input()}>
            <option value="">Choose one (optional)</option>
            {kinds.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </Field>
      )}

      {full && (
        <Field id={`${p}-when`} label="Timeline" optional>
          <select id={`${p}-when`} name="timeline" value={f.when} onChange={(ev) => set("when", ev.target.value)} className={input()}>
            <option value="">Not sure yet</option>
            <option value="As soon as possible">As soon as possible</option>
            <option value="Within a month">Within a month</option>
            <option value="In the next few months">In the next few months</option>
          </select>
        </Field>
      )}

      <Field id={`${p}-message`} label="Project details">
        <textarea
          id={`${p}-message`}
          name="message"
          rows={full ? 6 : 5}
          value={f.message}
          onChange={(ev) => set("message", ev.target.value)}
          aria-invalid={!!e.message}
          aria-describedby={`${p}-message-help`}
          placeholder={full ? "What are you building, who is it for, and what does done look like?" : "What are you building, and when do you need it?"}
          className={`${input(e.message)} min-h-36 resize-y leading-normal`}
        />
        <span id={`${p}-message-help`} className={`text-[0.8125rem] ${e.message ? "text-danger" : "text-muted"}`}>
          {e.message ?? `${msgLen} characters · at least 20`}
        </span>
      </Field>

      {status === "failed" && (
        <div role="alert" className="rounded-[10px] bg-danger-bg px-3.5 py-3 text-sm text-danger-ink">
          Something went wrong sending your message. Please try again, or email me at{" "}
          <a href={`mailto:${person.email}`} className="font-semibold underline">
            {person.email}
          </a>
          .
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-accent px-5 font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-progress disabled:opacity-85 md:min-h-13"
      >
        {status === "sending" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden className="animate-spin">
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
        )}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="text-[0.8125rem] text-muted">Sent securely through Formspree. Your details are only used to reply to you.</p>
    </form>
  );
}

function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && id.endsWith("message") === false && (
        <span id={`${id}-err`} className="text-[0.8125rem] text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
