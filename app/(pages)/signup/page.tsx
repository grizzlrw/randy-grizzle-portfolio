"use client"
// app/(pages)/forms/page.tsx
import { postSignup } from "@/lib/actions";
import Button from "@mui/material/Button";
import { useState } from "react";
import InputField from "@/app/components/_inputs/InputField";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import TimesIcon from "@mui/icons-material/Close";

export default function FormsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});

  const [globalMessage, setGlobalMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);

    const nextErrors: typeof fieldErrors = {};
    if (!firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setIsError(true);
      setGlobalMessage("Please fix the highlighted fields.");
      return;
    }

    setFieldErrors({});
    const result = await postSignup(firstName, lastName, email);

    if (result.ok) {
      setIsError(false);
      setGlobalMessage("Signup successful!");
      setIsSubmitted(false);
    } else {
      setIsError(true);
      setGlobalMessage(result.message ?? "Signup failed.");

      // Example: show field-level error for duplicate email
      if (result.message?.toLowerCase().includes("email")) {
        setFieldErrors({ email: result.message });
      }
    }

    

  }

  return (
    <main className="max-w-2xl mx-auto py-24">

      {globalMessage && (
        <Alert
          icon={isError ? <TimesIcon fontSize="inherit" /> : <CheckIcon fontSize="inherit" />}
          severity={isError ? "error" : "success"}
        >
          {globalMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto py-8 space-y-6">
        <InputField
          id="firstname"
          name="firstname"
          label="First Name"
          placeholder="First Name"
          type="text"
          className="w-full border p-2 rounded"
          value={firstName}
          onChange={setFirstName}
          required
          error={fieldErrors.firstName}
          helperText={fieldErrors.firstName}
        />

        <InputField
          id="lastname"
          name="lastname"
          label="Last Name"
          placeholder="Last Name"
          type="text"
          className="w-full border p-2 rounded"
          value={lastName}
          onChange={setLastName}
          required
          error={fieldErrors.lastName}
          helperText={fieldErrors.lastName}
        />

        <InputField
          id="email"
          name="email"
          label="Email"
          placeholder="test@example.com"
          type="email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={setEmail}
          required
          error={fieldErrors.email}
          helperText={fieldErrors.email}
        /> 

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </main>
  );
}