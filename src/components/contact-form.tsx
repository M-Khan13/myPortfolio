"use client";

import useWeb3Forms from "@web3forms/react";
import { useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Contact form, submitted straight to Web3Forms from the browser. No page
 * reload and no `mailto:` handoff — the result lands inline under the button.
 *
 * The access key is `NEXT_PUBLIC_` on purpose: Web3Forms rejects server-side
 * submissions unless you're on their Pro plan ("Use our API in client side"),
 * so the key has to reach the browser. Their keys are designed for this — a key
 * can only submit to the form it belongs to, and abuse is handled by the
 * honeypot below plus the domain restrictions on the Web3Forms dashboard.
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

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export function ContactForm() {
  const id = useId();
  // Reset needs the form after the submit resolves, by which point React has
  // already cleared `currentTarget` on the original event.
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const sending = status.kind === "sending";
  const settled = status.kind === "sent" || status.kind === "error";

  const { submit } = useWeb3Forms({
    access_key: ACCESS_KEY,
    settings: {
      from_name: "Portfolio Contact",
      subject: "New message from farzankhan.dev",
    },
    onSuccess: () => {
      formRef.current?.reset();
      setStatus({ kind: "sent", message: SENT });
    },
    onError: () => setStatus({ kind: "error", message: FAILED }),
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus({ kind: "sending" });

    try {
      await submit(data);
    } catch {
      // `submit` reports failures through onError; this only catches a throw
      // (an offline fetch), which would otherwise strand the sending state.
      setStatus({ kind: "error", message: FAILED });
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mt-10">
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
        the tab order — only a bot filling every input will touch it. Web3Forms
        drops any submission where `botcheck` is set.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] opacity-0">
        <label htmlFor={`${id}-botcheck`}>Leave this field empty</label>
        <input
          id={`${id}-botcheck`}
          type="checkbox"
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
