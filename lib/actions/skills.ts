"use server";

import { prisma } from "@/lib/prisma";

/**
 * Server action to fetch all skills
 * Directly queries the database instead of going through GraphQL HTTP endpoint
 */
export async function fetchSkills() {
  try {
    return await prisma.skill.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw new Error(`Failed to fetch skills: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
