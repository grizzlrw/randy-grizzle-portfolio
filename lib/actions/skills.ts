"use server";

import type { SkillsQuery } from "@/generated/graphql";

// Server actions run on the server, so we need an absolute URL
const GRAPHQL_ENDPOINT = 
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  (process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/graphql` 
    : `http://localhost:${process.env.PORT || 3000}/api/graphql`);

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

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 600, tags: ["skills"] }, // Cache for 10 minutes
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`GraphQL fetch failed (${res.status}):`, errorText);
      throw new Error(`Failed to fetch skills: ${res.status} ${res.statusText}`);
    }

    const json = (await res.json()) as { data: SkillsQuery; errors?: unknown[] };
    
    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    return json.data.skills;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw new Error(`Failed to fetch skills: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
