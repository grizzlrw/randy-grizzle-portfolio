"use server";

import type { NotesQuery } from "@/generated/graphql";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "http://localhost:3000/api/graphql";

/**
 * Server action to fetch all notes from GraphQL API
 * Uses Next.js server-side rendering for optimal performance
 */
export async function fetchNotes(): Promise<NotesQuery["notes"]> {
  const query = `
    query Notes {
      notes {
        id
        title
        content
        createdAt
      }
    }
  `;

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300, tags: ["notes"] }, // Cache for 5 minutes
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  const json = (await res.json()) as { data: NotesQuery };
  return json.data.notes;
}
