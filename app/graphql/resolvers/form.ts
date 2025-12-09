// graphql/resolvers/form.ts
import { getFormBySlug } from "@/lib/actions";

type FormElement = {
  id: string;
  parentId: string | null;
  form: { elements: FormElement[] };
  options?: unknown[];
};

type Form = {
  elements: FormElement[];
};

export const formResolvers = {
  Query: {
    formBySlug: async (_parent: unknown, { slug }: { slug: string }) => {
      const form = await getFormBySlug(slug);
      if (!form) return null;
      return form; // shape should match your GraphQL types
    },
  },
  Form: {
    elements: (form: Form) => form.elements,
  },
  FormElement: {
    options: (element: FormElement) => element.options,
    // If you want children in GraphQL:
    children: (element: FormElement) =>
      element.form.elements.filter((e: FormElement) => e.parentId === element.id),
  },
};