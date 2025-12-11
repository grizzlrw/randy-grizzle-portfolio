import { DynamicFieldConfig, DynamicFieldType } from "@/app/components/_dynamic-form/dynamic-form";
import { getFormBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";
import DynamicFormClient from "../../../components/_dynamic-form/DynamicFormClient";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";

type PageProps = {
  params: { slug: string };
};

type GqlFormElement = {
  id: string;
  name: string;
  type: string;
  label: string | null;
  placeholder?: string | null;
  heading?: string | null;
  description?: string | null;
  min?: number | null;
  max?: number | null;
  step?: number | null;
  defaultValue?: unknown | null;
  rules?: Record<string, unknown> | null;
  options?: { value: string; label: string }[];
  parentId?: string | null;
  position: number;
};

type GqlForm = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  elements: GqlFormElement[];
};

export function mapFormToDynamicFieldConfig(form: GqlForm): DynamicFieldConfig[] {
  const byParent: Record<string | "root", GqlFormElement[]> = { root: [] };

  for (const el of form.elements) {
    const key = el.parentId ?? "root";
    (byParent[key] ??= []).push(el);
  }

  for (const key of Object.keys(byParent)) {
    byParent[key].sort((a, b) => a.position - b.position);
  }

  const buildConfig = (el: GqlFormElement): DynamicFieldConfig => {
    if (el.type === "SECTION") {
      const children = (byParent[el.id] ?? []).map(buildConfig);
      return {
        name: el.name,
        type: "section",
        label: el.label ?? '',
        heading: el.heading ?? undefined,
        description: el.description ?? undefined,
        children,
      };
    }

    return {
      name: el.name,
      type: el.type.toLowerCase() as DynamicFieldType, // e.g. "TEXT" -> "text"
      label: el.label ?? '',
      placeholder: el.placeholder ?? undefined,
      min: el.min ?? undefined,
      max: el.max ?? undefined,
      step: el.step ?? undefined,
      defaultValue: el.defaultValue ?? undefined,
      rules: (el.rules as Record<string, unknown> | null) ?? undefined,
      options: el.options ?? undefined,
    };
  };

  return (byParent.root ?? []).map(buildConfig);
}

export default async function FormsDynamicPage({ params }: PageProps) {
  const { slug } = await params; 

  const form = await getFormBySlug(slug); // or fetch via GraphQL client
  if (!form) {
    notFound();
  }

  const fields: DynamicFieldConfig[] = mapFormToDynamicFieldConfig(form as GqlForm);

  return (
    <PageLayout 
      title={form.name}
      subtitle={form.description || "Please fill out the form below."}
      maxWidth={960}
      component="div"
    >
      <DynamicFormClient fields={fields} />
    </PageLayout>
  );
}
