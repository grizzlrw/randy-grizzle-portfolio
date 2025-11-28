# Dev Checklist: Prisma + GraphQL + Codegen

This project has three main layers that must stay in sync:

- Prisma schema and database
- GraphQL Yoga schema/resolvers
- GraphQL codegen + client calls

Use this checklist whenever you change data models or GraphQL operations.

---

## 1. Update Prisma models

Edit `prisma/schema.prisma`:

- Add or change `model` definitions (e.g., `Note`, `Skill`, `Signup`).

Then sync the database and regenerate the Prisma client:

```powershell
npx prisma db push
npx prisma generate
```

This makes sure:
- The DB schema matches `schema.prisma`.
- `@prisma/client` typings are regenerated (so `prisma.<model>` exists).

---

## 2. Update GraphQL schema and resolvers

Edit `graphql/schema.ts`:

- Make sure `typeDefs` describes what you want to expose (e.g., `SignupInput`, `SignupResult`, `type Mutation { signup(...): SignupResult! }`).
- In `resolvers`, only call Prisma models/fields that now exist in `schema.prisma`.

Example pattern for a mutation:

```ts
signup: async (
  _parent,
  args: { input: { firstName: string; lastName: string; email: string } }
) => {
  const created = await prisma.signup.create({
    data: {
      firstName: args.input.firstName,
      lastName: args.input.lastName,
      email: args.input.email,
    },
  });

  return {
    ok: true,
    message: `Signup successful. Created: ${created.firstName} ${created.lastName}`,
  };
},
```

Restart the dev server so Yoga picks up changes:

```powershell
npm run dev
```

Confirm the schema via the GraphQL endpoint:

- Open `http://localhost:3000/api/graphql`.
- Check that new types/fields appear (e.g., `signup` on `Mutation`).
- Test queries/mutations here first.

---

## 3. Keep GraphQL codegen in sync

Operation documents live under `graphql/` (e.g., `graphql/queries/*.graphql`, `graphql/mutations/*.graphql`).

Whenever you add or change a `.graphql` operation:

1. Make sure `npm run dev` is running and the GraphQL endpoint is healthy.
2. Regenerate types:

   ```powershell
   npm run codegen
   ```

This updates `generated/graphql.ts` with:

- Schema types (e.g., `Note`, `Skill`, `SignupInput`, `SignupResult`).
- Operation types (e.g., `NotesQuery`, `SkillsQuery`, `SignupMutation`).

If `generated/graphql.ts` seems stuck, you can clear it and run `npm run codegen` again.

---

## 4. Client calls (`lib/graphqlClient.ts`)

Use the generated types when calling GraphQL from the app.

Pattern:

```ts
import { SignupMutation, SignupMutationVariables } from "@/generated/graphql";

export async function postSignup(
  firstName: string,
  lastName: string,
  email: string,
): Promise<string | null> {
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
    throw new Error("Failed to post signup");
  }

  const json = await res.json();
  const data = (json as { data?: SignupMutation | null }).data;
  return data?.signup?.message ?? null;
}
```

Key ideas:

- Send `{ query, variables }` JSON to `GRAPHQL_ENDPOINT`.
- Use generated operation types to keep things typed.
- Access response defensively (`data?.field`) so GraphQL errors don’t crash the client.

---

## 5. Forms

For forms that talk to GraphQL:

- Use a client component with `onSubmit`.
- Call your `graphqlClient` helper inside `handleSubmit`.
- Avoid mixing Next server actions (`action={...}`) with these GraphQL calls.

Example:

```tsx
<form onSubmit={handleSubmit}>
  {/* inputs bound to React state */}
</form>
```

This keeps the flow simple:

Form → `graphqlClient` → `/api/graphql` → Prisma → DB.
