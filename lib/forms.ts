// lib/forms.ts
import { prisma } from "@/lib/prisma";

export async function getFormBySlug(slug: string) {
  return prisma.form.findUnique({
    where: { slug },
    include: {
      elements: {
        include: { options: true },
        orderBy: { position: "asc" },
      },
    },
  });
}