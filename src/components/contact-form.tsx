"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Contact form, posted to `/api/contact`, which relays to Web3Forms with the
 * server-side access key. No page reload and no `mailto:` handoff — the result
 * lands inline under the button.
 */

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; message: string }
  | { kind: "error"; message: string };

const FIELDS = [
  { name: "name", label: "NAME", type: "text", autoComplete: "name" },
  { name: "email", label: "EMAIL", type: "email", autoComplete: "email" },
] as const;

const SENT = "Message sent — I'll get back to you.";
const FAILED =
  "Something went wrong — email me directly at farzankhan1800@gmail.com.";

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const sending = status.kind === "sending";
  const settled = status.kind === "sent" || status.kind === "error";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as {
        ok: boolean;
        message: string;
      };

      if (result.ok) {
        form.reset();
        setStatus({ kind: "sent", message: SENT });
      } else {
        // A 400 is something the visitor can fix themselves — a missing field
        // or a malformed address — so the server's specific line is more use
        // than the generic fallback. Anything else is our problem, and points
        // them at email instead.
        setStatus({
          kind: "error",
          message: response.status === 400 ? result.message : FAILED,
        });
      }
    } catch {
      setStatus({ kind: "error", message: FAILED });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-10">
      <p className="label mb-6">SEND_MESSAGE.SH</p>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <Field
            key={field.name}
            id={`${id}-${field.name}`}
            name={field.name}
            label={field.label}
            type={field.type}
            autoComplete={field.autoComplete}
          />
        ))}
      </div>

      <div className="mt-6">
        <Field
          id={`${id}-message`}
          name="message"
          label="MESSAGE"
          multiline
        />
      </div>

      {/*
        Honeypot. Hidden from sight and from assistive tech, and excluded from
        the tab order — only a bot filling every input will touch it.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] opacity-0">
        <label htmlFor={`${id}-botcheck`}>Leave this field empty</label>
        <input
          id={`${id}-botcheck`}
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={sending}
          className="rounded-md bg-primary px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-primary-foreground transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send"}
        </button>

        {/*
          One live region for both outcomes, mounted at all times so a screen
          reader announces the result without the form stealing focus.

          Monochrome, like the rest of the site: a failure needs attention so it
          takes the off-white foreground, while a success is a quiet
          confirmation in muted grey. Neither uses colour.
        */}
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "font-mono text-[0.75rem]",
            settled && "mt-4",
            status.kind === "error" ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {settled ? status.message : ""}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  multiline = false,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const shared =
    "w-full border-b border-rule bg-transparent pb-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 hover:border-rule-strong focus:border-foreground focus:outline-none";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required
          rows={4}
          className={cn(shared, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required
          autoComplete={autoComplete}
          className={shared}
        />
      )}
    </div>
  );
}
