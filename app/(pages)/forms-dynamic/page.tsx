"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DynamicForm, { DynamicFieldConfig } from "@/app/components/_dynamic-form/dynamic-form";

const fields: DynamicFieldConfig[] = [
  {
    name: "personalInfo",
    type: "section",
    label: "Personal Information",
    heading: "Personal Information",
    description: "Tell us a bit about yourself.",
    children: [
      {
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Ada Lovelace",
        rules: { required: "Name is required" },
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "you@example.com",
        rules: {
          required: "Email is required",
          pattern: {
            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
            message: "Enter a valid email address",
          },
        },
      },
    ],
  },
  {
    name: "addressInfo",
    type: "section",
    label: "Shipping Address",
    heading: "Shipping Address",
    description: "Where would you like your equipment shipped?",
    children: [
      {
        name: "address1",
        type: "text",
        label: "Address Line 1",
        placeholder: "123 Main St",
        rules: { required: "Address Line 1 is required" },
      },
      {
        name: "address2",
        type: "text",
        label: "Address Line 2",
        placeholder: "Apt, suite, etc. (optional)",
      },
      {
        name: "city",
        type: "text",
        label: "City",
      },
      {
        name: "state",
        type: "select",
        options: [
            { value: "AL", label: "Alabama" },
            { value: "AK", label: "Alaska" },
            { value: "AZ", label: "Arizona" },
            { value: "AR", label: "Arkansas" },
            { value: "CA", label: "California" },
            { value: "CO", label: "Colorado" },
            { value: "CT", label: "Connecticut" },
            { value: "DE", label: "Delaware" },
            { value: "FL", label: "Florida" },
            { value: "GA", label: "Georgia" },
            { value: "HI", label: "Hawaii" },
            { value: "ID", label: "Idaho" },
            { value: "IL", label: "Illinois" },
            { value: "IN", label: "Indiana" },
            { value: "IA", label: "Iowa" },
            { value: "KS", label: "Kansas" },
            { value: "KY", label: "Kentucky" },
            { value: "LA", label: "Louisiana" },
            { value: "ME", label: "Maine" },
            { value: "MD", label: "Maryland" },
            { value: "MA", label: "Massachusetts" },
            { value: "MI", label: "Michigan" },
            { value: "MN", label: "Minnesota" },
            { value: "MS", label: "Mississippi" },
            { value: "MO", label: "Missouri" },
            { value: "MT", label: "Montana" },
            { value: "NE", label: "Nebraska" },
            { value: "NV", label: "Nevada" },
            { value: "NH", label: "New Hampshire" },
            { value: "NJ", label: "New Jersey" },
            { value: "NM", label: "New Mexico" },
            { value: "NY", label: "New York" },
            { value: "NC", label: "North Carolina" },
            { value: "ND", label: "North Dakota" },
            { value: "OH", label: "Ohio" },
            { value: "OK", label: "Oklahoma" },
            { value: "OR", label: "Oregon" },
            { value: "PA", label: "Pennsylvania" },
            { value: "RI", label: "Rhode Island" },
            { value: "SC", label: "South Carolina" },
            { value: "SD", label: "South Dakota" },
            { value: "TN", label: "Tennessee" },
            { value: "TX", label: "Texas" },
            { value: "UT", label: "Utah" },
            { value: "VT", label: "Vermont" },
            { value: "VA", label: "Virginia" },
            { value: "WA", label: "Washington" },
            { value: "WV", label: "West Virginia" },
            { value: "WI", label: "Wisconsin" },
            { value: "WY", label: "Wyoming" },
        ],
        label: "State",
        rules: { required: "State is required" },
      },
      {
        name: "zip",
        type: "text",
        label: "ZIP Code",
        placeholder: "12345",
        rules: { required: "ZIP Code is required" },
      },
    ],
  },
  { name: "careerInfo",
    type: "section",
    label: "Career Information",
    heading: "Career Information",
    description: "Help us understand your background.",
    children: [
      {
        name: "role",
        type: "select",
        label: "Role",
        options: [
        { value: "junior", label: "Junior" },
        { value: "mid", label: "Mid" },
        { value: "senior", label: "Senior" },
        ],
        rules: { required: "Role is required" },
      },
      {
        name: "experience",
        type: "number",
        label: "Years of experience",
        min: 0,
        max: 40,
      },
      {
        name: "availability",
        type: "switch",
        label: "Available for work",
      },
      {
        name: "hoursPerWeek",
        type: "slider",
        label: "Preferred hours per week",
        min: 5,
        max: 40,
        step: 5,
        defaultValue: 20,
      },
      {
        name: "favoriteTech",
        type: "autocomplete",
        label: "Favorite technology",
        options: [
        { value: "react", label: "React" },
        { value: "nextjs", label: "Next.js" },
        { value: "typescript", label: "TypeScript" },
        { value: "graphql", label: "GraphQL" },
        ],
      },
    ]
  },
  
  {
    name: "newsletter",
    type: "checkbox",
    label: "Subscribe to newsletter",
  },
  
  {
    name: "excitement",
    type: "rating",
    label: "How excited are you about this role?",
    max: 5,
    defaultValue: 4,
  },
];

export default function DynamicFormsPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between py-16 bg-white dark:bg-black sm:items-start">
      <Box component="section" sx={{ width: "100%", maxWidth: 960, mx: "auto", py: 8, px: 2 }}>
        <Typography component="h1" variant="h3" sx={{ mb: 4 }}>
            Dynamic Form (React Hook Form)
        </Typography>

        <Typography component="p" sx={{ mb: 4 }}>
            This page demonstrates a dynamic form driven by a field configuration
            schema, rendered through shared input components and managed by React
            Hook Form.
        </Typography>

        <DynamicForm
            fields={fields}
            onSubmit={(values) => {
            console.log("Dynamic form submitted", values);
            }}
            submitLabel="Submit"
        />
        </Box>
    </main>
  );
}
