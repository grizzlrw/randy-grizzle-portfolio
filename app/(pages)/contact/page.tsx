"use client";

import { Box, Button, Stack, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";
import { contactSchema, type ContactFormData } from "@/lib/validations/schemas";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  // Validate a single field
  function validateField(field: keyof ContactFormData, value: string) {
    const fieldSchema = contactSchema.pick({ [field]: true });
    const validation = fieldSchema.safeParse({ [field]: value });
    
    if (!validation.success) {
      const error = validation.error.issues[0]?.message;
      setFieldErrors(prev => ({ ...prev, [field]: error }));
    } else {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }

  function handleBlur(field: keyof ContactFormData) {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    // Validate with Zod
    const validation = contactSchema.safeParse(formData);
    
    if (!validation.success) {
      const errors: Partial<Record<keyof ContactFormData, string>> = {};
      validation.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        if (field) {
          errors[field] = err.message;
        }
      });
      setFieldErrors(errors);
      setStatus("error");
      setError("Please fix the validation errors below.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to send message.");
    }
  }

  return (
    <PageLayout title="Contact" maxWidth={1116}>
        <Typography component="p" sx={{ mb: 4 }}>
          Have a project in mind, a question about my work, or just want to
          talk shop about accessibility or UI architecture? Drop a note here! I look
          forward to hearing from you!
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {status === "success" && (
            <Alert severity="success">Thanks for reaching out — I&apos;ll get back to you soon.</Alert>
          )}
          {status === "error" && error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            onBlur={() => handleBlur("name")}
            required
            error={touched.name && !!fieldErrors.name}
            helperText={touched.name ? fieldErrors.name : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                '&.Mui-focused': {
                  transform: 'translateY(-2px)',
                },
              },
            }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            onBlur={() => handleBlur("email")}
            required
            error={touched.email && !!fieldErrors.email}
            helperText={touched.email ? fieldErrors.email : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                '&.Mui-focused': {
                  transform: 'translateY(-2px)',
                },
              },
            }}
          />

          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            onBlur={() => handleBlur("message")}
            required
            error={touched.message && !!fieldErrors.message}
            helperText={touched.message ? fieldErrors.message : ""}
            multiline
            minRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                '&.Mui-focused': {
                  transform: 'translateY(-2px)',
                },
              },
            }}
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </Button>
          </Stack>
        </Box>
    </PageLayout>
  );
}
