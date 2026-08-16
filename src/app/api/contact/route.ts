/**
 * Contact form relay.
 *
 * The browser posts here instead of straight to Web3Forms so `WEB3FORMS_KEY`
 * stays on the server — a `NEXT_PUBLIC_` key would be visible in the bundle and
 * usable by anyone to send mail through the account.
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Where Web3Forms delivers, configured on the access key itself. */
const SUBJECT = "New message from farzankhan.dev";

/** Sender label on the notification email. */
const FROM_NAME = "Portfolio Contact";

type Result = { ok: boolean; message: string };

function json(body: Result, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  const key = process.env.WEB3FORMS_KEY;

  if (!key) {
    console.error("WEB3FORMS_KEY is not set — contact form is inert.");
    return json(
      { ok: false, message: "The form isn't configured yet. Email me instead." },
      503,
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Malformed request." }, 400);
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const read = (field: string) =>
    typeof body[field] === "string" ? body[field].trim() : "";

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot has no signal that it was caught.
  if (read("botcheck")) {
    return json({ ok: true, message: "Thanks — message sent." }, 200);
  }

  const name = read("name");
  const email = read("email");
  const message = read("message");

  if (!name || !email || !message) {
    return json({ ok: false, message: "All three fields are required." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, message: "That email address looks off." }, 400);
  }

  if (message.length > 5000) {
    return json({ ok: false, message: "Message is too long." }, 400);
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: SUBJECT,
        // Fixed sender label so every notification threads the same way; the
        // visitor's own name and address travel in the body and in `replyto`,
        // so hitting reply still answers them directly.
        from_name: FROM_NAME,
        name,
        email,
        message,
        replyto: email,
      }),
    });

    // A rejected key can come back as HTML, so a parse failure is a send
    // failure, not an unreachable service — keep it inside this branch.
    const result = (await response.json().catch(() => ({}))) as {
      success?: boolean;
    };

    if (!response.ok || !result.success) {
      return json(
        { ok: false, message: "Couldn't send that. Try again in a moment." },
        502,
      );
    }

    return json({ ok: true, message: "Thanks — message sent." }, 200);
  } catch {
    return json(
      { ok: false, message: "Couldn't reach the mail service. Try again." },
      502,
    );
  }
}
