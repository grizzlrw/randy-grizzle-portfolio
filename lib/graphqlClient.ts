// lib/graphqlClient.ts
import type { NotesQuery, SignupMutation, SignupMutationVariables } from "@/generated/graphql";
import type { SkillsQuery } from "@/generated/graphql";

function getEndpoint() {
  // Browser can use absolute or relative — either works
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "/api/graphql";
  }

  // Server MUST use a relative URL so it doesn't require URL()
  return "/api/graphql";
}

export async function postSignup(
  firstName: string,
  lastName: string,
  email: string
): Promise<{ ok: boolean; message: string | null }> {
  const endpoint = getEndpoint();

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

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const json = await res.json();
  const data = json.data?.signup;

  return data ?? { ok: false, message: "Unexpected error while signing up." };
}

export async function fetchNotes(): Promise<NotesQuery["notes"]> {
  const endpoint = getEndpoint();

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

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  return json.data.notes;
}

export async function fetchSkills(): Promise<SkillsQuery["skills"]> {
  const endpoint = getEndpoint();

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

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  return json.data.skills;
}
