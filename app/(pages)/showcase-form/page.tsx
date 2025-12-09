"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import InputField from "@/app/components/_inputs/InputField";
import SelectField from "@/app/components/_inputs/SelectField";
import RadioGroupField from "@/app/components/_inputs/RadioGroupField";
import CheckboxField from "@/app/components/_inputs/CheckboxField";
import NumberField from "@/app/components/_inputs/NumberField";
import SwitchField from "@/app/components/_inputs/SwitchField";
import SliderField from "@/app/components/_inputs/SliderField";


const selectOptions = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
];

const radioOptions = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Full Stack" },
];

const checkboxLabel = "Subscribe to newsletter";



export default function FormsShowcasePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("mid");
  const [discipline, setDiscipline] = useState("frontend");
  const [subscribed, setSubscribed] = useState(false);
  const [yearsExperience, setYearsExperience] = useState<number | "">(3);
  const [isAvailable, setIsAvailable] = useState(true);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // No network calls here; this is a pure demo form
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between py-16 bg-white dark:bg-black sm:items-start">
      <Box component="section" sx={{ width: "100%", maxWidth: 960, mx: "auto", py: 2, px: 2 }}>
            <Typography component="h1" variant="h3" sx={{ mb: 4 }}>
                Form Components Showcase
            </Typography>

            <Typography component="p" sx={{ mb: 4 }}>
                This page demonstrates all shared form input components from
                {" "}
                <code>app/components/_inputs</code> wired up as controlled fields, without
                any backend or GraphQL integration.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
                <Stack spacing={3}>
                <InputField
                    id="demo-name"
                    name="name"
                    label="Name"
                    placeholder="Ada Lovelace"
                    value={name}
                    onChange={setName}
                />

                <InputField
                    id="demo-email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                />

                <SelectField
                    id="demo-role"
                    name="role"
                    label="Role level"
                    value={role}
                    onChange={setRole}
                    options={selectOptions}
                />

                <RadioGroupField
                    id="demo-discipline"
                    name="discipline"
                    label="Primary discipline"
                    value={discipline}
                    onChange={setDiscipline}
                    options={radioOptions}
                    row
                />

                <CheckboxField
                    id="demo-subscribed"
                    name="subscribed"
                    label={checkboxLabel}
                    checked={subscribed}
                    onChange={setSubscribed}
                />

                <NumberField
                    id="demo-years-experience"
                    name="yearsExperience"
                    label="Years of experience"
                    value={yearsExperience}
                    onChange={setYearsExperience}
                    min={0}
                    max={40}
                />

                <SwitchField
                    id="demo-availability"
                    name="availability"
                    label="Currently available for work"
                    checked={isAvailable}
                    onChange={setIsAvailable}
                />

                <SliderField
                    id="demo-hours-per-week"
                    name="hoursPerWeek"
                    label="Preferred hours per week"
                    value={hoursPerWeek}
                    onChange={setHoursPerWeek}
                    min={5}
                    max={40}
                    step={5}
                />

                <Box sx={{ pt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                    Log form values
                    </Button>
                </Box>
                </Stack>
            </Box>
        </Box>
    </main>
  );
}
