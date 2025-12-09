"use server";

import type { SkillsQuery } from "@/generated/graphql";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "http://localhost:3000/api/graphql";

/**
 * Server action to fetch all skills from GraphQL API
 * Uses Next.js server-side rendering with caching for performance
 */
export async function fetchSkills(): Promise<SkillsQuery["skills"]> {
  const query = `
    query Skills {
      skills {
        id
        title
        description
        imageUrl
        imageAlt
        route
        createdAt
      }
    }
  `;

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 600, tags: ["skills"] }, // Cache for 10 minutes
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch skills");
  }

  const json = (await res.json()) as { data: SkillsQuery };
  return json.data.skills;
}
