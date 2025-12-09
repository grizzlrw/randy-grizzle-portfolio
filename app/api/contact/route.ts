import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/schemas";

// This handler expects RESEND_API_KEY and CONTACT_TO_EMAIL in your env.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate with Zod
    const validation = contactSchema.safeParse(body);
    
    if (!validation.success) {
      const firstError = validation.error.issues?.[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    
    const { name, email, message } = validation.data;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { error: "Email configuration is missing on the server." },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `Portfolio Contact <onboarding@resend.dev>`,
        to: [toEmail],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        text: `From: ${name} <${email}>

${message}`,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Resend error", data);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error", err);
    return NextResponse.json(
      { error: "Unexpected error while sending message." },
      { status: 500 }
    );
  }
}
