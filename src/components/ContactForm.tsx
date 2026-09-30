"use client";

import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { formEndpoint, person } from "@/content/site";

type Field = "name" | "email" | "subject" | "message";
type Status = "idle" | "sending" | "sent" | "failed";

const messages: Record<Field, string> = {
  name: "Add your name so I know who I'm replying to.",
  email: "Add an email address I can reply to, like you@company.com.",
  subject: "Add a short subject.",
  message: "Tell me a little about the project or role.",
};

const reasons = ["Freelance project", "Full-time role", "Something else"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const check = (el: HTMLInputElement | HTMLTextAreaElement) => {
    const field = el.name as Field;
    const bad = !el.validity.valid;
    setErrors((e) => ({ ...e, [field]: bad ? messages[field] : undefined }));
    return !bad;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[required], textarea[required]"));
    const results = fields.map(check);
    if (results.includes(false)) {
      fields[results.indexOf(false)].focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(formEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-xl border border-rule bg-sheet p-6 md:p-8" aria-describedby="form-status">
      <fieldset>
        <legend className="text-sm font-semibold">What is this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {reasons.map((r, i) => (
            <label key={r} className="cursor-pointer">
              <input type="radio" name="reason" value={r} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex h-10 items-center rounded-xl border border-field px-4 text-sm font-medium text-ink-2 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-text hover:text-ink">
                {r}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input name="name" label="Name" autoComplete="name" error={errors.name} onBlur={check} />
        <Input name="email" label="Email" type="email" autoComplete="email" error={errors.email} onBlur={check} />
        <div className="sm:col-span-2">
          <Input name="subject" label="Subject" error={errors.subject} onBlur={check} />
        </div>
        <div className="sm:col-span-2">
          <Input name="message" label="Message" hint="The goal, a rough timeline and budget help me reply with something useful." multiline error={errors.message} onBlur={check} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="relative inline-flex h-12 items-center overflow-hidden rounded-xl bg-accent px-7 font-semibold text-on-accent transition-transform duration-200 ease-out-expo hover:-translate-y-0.5 active:translate-y-px disabled:cursor-progress disabled:opacity-80 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Sending" : "Send message"}
          {status === "sending" && (
            <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden" aria-hidden>
              <span className="block h-full w-1/3 animate-[pending_1.1s_ease-in-out_infinite] bg-on-accent/60 motion-reduce:animate-none" />
            </span>
          )}
        </button>
        <p id="form-status" role="status" className="text-[0.975rem]">
          {status === "sent" && (
            <span className="inline-flex items-center gap-2 font-semibold">
              <CheckCircle size={20} weight="fill" className="shrink-0 text-accent-text" aria-hidden />
              Message sent. I&apos;ll reply to the email you gave.
            </span>
          )}
          {status === "failed" && (
            <span>
              That didn&apos;t send. Email me at{" "}
              <a href={`mailto:${person.email}`} className="font-semibold underline">
                {person.email}
              </a>{" "}
              instead.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}

function Input({
  name,
  label,
  type = "text",
  multiline,
  autoComplete,
  hint,
  error,
  onBlur,
}: {
  name: Field;
  label: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
  hint?: string;
  error?: string;
  onBlur: (el: HTMLInputElement | HTMLTextAreaElement) => void;
}) {
  const id = `f-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  const cls = `w-full rounded-xl border bg-bg px-3.5 text-base text-ink transition-colors hover:border-ink-2 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
    error ? "border-danger" : "border-field"
  }`;
  const shared = {
    id,
    name,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => onBlur(e.currentTarget),
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {multiline ? <textarea {...shared} rows={6} className={`${cls} resize-y py-3`} /> : <input {...shared} type={type} autoComplete={autoComplete} className={`${cls} h-12`} />}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-ink-2">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
