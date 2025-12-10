"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

/**
 * Server action to fetch a form by its slug
 * Includes all form elements and their options
 * Cached for 15 minutes for better performance
 */
export async function getFormBySlug(slug: string) {
  return unstable_cache(
    async () => {
      return prisma.form.findUnique({
        where: { slug },
        include: {
          elements: {
            include: { options: true },
            orderBy: { position: "asc" },
          },
        },
      });
    },
    [`form-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: ["forms", `form-${slug}`],
    }
  )();
}
