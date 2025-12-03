// graphql/resolvers/form.ts
import { getFormBySlug } from "@/lib/forms";

export const formResolvers = {
  Query: {
    formBySlug: async (_parent, { slug }) => {
      const form = await getFormBySlug(slug);
      if (!form) return null;
      return form; // shape should match your GraphQL types
    },
  },
  Form: {
    elements: (form) => form.elements,
  },
  FormElement: {
    options: (element) => element.options,
    // If you want children in GraphQL:
    children: (element, _args, _ctx) =>
      element.form.elements.filter((e) => e.parentId === element.id),
  },
};