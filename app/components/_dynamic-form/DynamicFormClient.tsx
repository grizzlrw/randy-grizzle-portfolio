"use client";

import DynamicForm, { DynamicFieldConfig } from "@/app/components/_dynamic-form/dynamic-form";

type DynamicFormClientProps = {
  fields: DynamicFieldConfig[];
};

export default function DynamicFormClient({ fields }: DynamicFormClientProps) {
  return (
    <DynamicForm
      fields={fields}
      onSubmit={(values) => {
        // For now just log; can be replaced with a mutation later
        console.log("Dynamic form submitted", values);
      }}
      submitLabel="Submit"
    />
  );
}
