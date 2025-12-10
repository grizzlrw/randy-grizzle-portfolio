// lib/graphqlClient.ts
import type { NotesQuery, SignupMutation, SignupMutationVariables } from "@/generated/graphql";
import type { SkillsQuery } from "@/generated/graphql";
import { headers } from "next/headers";

export async function getGraphQLEndpoint() {
  // Browser: safe to use relative URL
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "/api/graphql";
  }

  // Next.js Server (RSC, SSR, ISR, prerender)
  const h = await headers();
  const host = h.get("host");

  // Vercel provides correct protocol via x-forwarded-proto
  const protocol = h.get("x-forwarded-proto") ?? "https";

  return `${protocol}://${host}/api/graphql`;
}

export const GRAPHQL_ENDPOINT = await getGraphQLEndpoint();

export async function postSignup(
  firstName: string,
  lastName: string,
  email: string
): Promise<{ ok: boolean; message: string | null }> {
  const mutation = `
    mutation Signup($input: SignupInput!) {
      signup(input: $input) {
        ok
        message
      }
    }
  `;

  const variables: SignupMutationVariables = {
    input: { firstName, lastName, email },
  };

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation, variables }),
  });

  if (!res.ok) {
    return { ok: false, message: "Network error while signing up." };
  }

  const json = (await res.json()) as { data?: SignupMutation; errors?: unknown };
  const data = json.data?.signup;

  if (!data) {
    return { ok: false, message: "Unexpected error while signing up." };
  }

  return { ok: data.ok, message: data.message ?? null };
}

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
    cache: "no-store",
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  const json = (await res.json()) as { data: NotesQuery };
  return json.data.notes;
}

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
    cache: "no-store",
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch skills");
  }

  const json = (await res.json()) as { data: SkillsQuery };
  return json.data.skills;
}
