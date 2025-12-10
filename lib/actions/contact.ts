"use server";

import { contactSchema } from "@/lib/validations/schemas";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * Server action to handle contact form submissions
 * Validates input using Zod schema and sends email via Resend
 */
export async function submitContact(
  name: string,
  email: string,
  message: string
): Promise<{ ok: boolean; message: string | null }> {
  // Validate inputs with Zod
  const validation = contactSchema.safeParse({ name, email, message });

  if (!validation.success) {
    const firstError = validation.error.issues?.[0];
    return { ok: false, message: firstError?.message ?? "Validation failed" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return { ok: false, message: "Email configuration is missing on the server." };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `Portfolio Contact <onboarding@resend.dev>`,
        to: [toEmail],
        reply_to: validation.data.email,
        subject: `New portfolio message from ${validation.data.name}`,
        text: `From: ${validation.data.name} <${validation.data.email}>

${validation.data.message}`,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Resend error:", data);
      return { ok: false, message: "Failed to send email." };
    }

    return { ok: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Contact error:", error);
    return { ok: false, message: "An error occurred while sending your message." };
  }
}
