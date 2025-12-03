import { createSchema } from "graphql-yoga";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { DateTimeScalar } from "@/graphql/scalars/scalars"
import { Prisma } from "@prisma/client";
import GraphQLJSON from "graphql-type-json";

export type GraphQLContext = {
    req: NextRequest
};



export const typeDefs = /* GraphQL */ `
scalar DateTime
scalar JSON

type Signup {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  createdAt: DateTime!
}

input SignupInput {
    firstName: String!
    lastName: String!
    email: String!
}

type SignupResult {
  ok: Boolean!
  message: String
}

type Note {
    id: ID!
    title: String!
    content: String!
    createdAt: DateTime!
}

type Skill {
    id: ID!
    title: String!
    description: String!
    imageUrl: String!
    imageAlt: String!
    route: String!
    createdAt: DateTime!
}
    
type Query {
    notes: [Note!]!
    skills: [Skill!]!
}

input CreateNoteInput {
    title: String!
    content: String!
}

type Mutation {
    createNote(input: CreateNoteInput!): Note!
    signup(input: SignupInput!): SignupResult!
}

type Form {
  id: ID!
  slug: String!
  name: String!
  description: String
  elements: [FormElement!]!
}

enum FormElementType {
  SECTION
  TEXT
  EMAIL
  PASSWORD
  SELECT
  CHECKBOX
  RADIO
  NUMBER
  SWITCH
  SLIDER
  AUTOCOMPLETE
  RATING
}

type FormElement {
  id: ID!
  formId: ID!
  parentId: ID
  position: Int!
  name: String!
  type: FormElementType!
  label: String!
  placeholder: String
  heading: String
  description: String
  min: Float
  max: Float
  step: Float
  defaultValue: JSON
  rules: JSON
  options: [FormOption!]!
  children: [FormElement!]!   # derived from parent_id
}

type FormOption {
  id: ID!
  elementId: ID!
  position: Int!
  value: String!
  label: String!
}

query GetForm($slug: String!) {
  formBySlug(slug: $slug) {
    id
    name
    elements {
      id
      name
      type
      label
      placeholder
      heading
      description
      min
      max
      step
      defaultValue
      rules
      options {
        value
        label
      }
      children {
        id
        name
        type
        label
        placeholder
        min
        max
        step
        defaultValue
        rules
        options {
          value
          label
        }
        # children of children, if you want deeper nesting
      }
    }
  }
}
`;

export const schema = createSchema<GraphQLContext>({
    typeDefs,
    resolvers: {
        DateTime: DateTimeScalar,
        JSON: GraphQLJSON,
        Query: {
            notes: async () => {
                return prisma.note.findMany({
                    orderBy: { createdAt: "desc" },
                });
            },
            skills: async () => {
                return prisma.skill.findMany({
                    orderBy: { createdAt: "desc" },
                });
            },
        },
        Mutation: {
            createNote: async (
                _parent: unknown,
                args: { input: { title: string; content: string } }
            ) => {
                return prisma.note.create({
                    data: {
                        title: args.input.title,
                        content: args.input.content,
                    },
                });
            },
            signup: async (
            _parent,
            args: { input: { firstName: string; lastName: string; email: string } }
            ) => {
                try {
                    const created = await prisma.signup.create({
                        data: {
                        firstName: args.input.firstName,
                        lastName: args.input.lastName,
                        email: args.input.email,
                        },
                    });

                    return {
                        ok: true,
                        message: `Signup successful.  Created: ${created.firstName} ${created.lastName}`,
                    };
                } catch (err) {
                    const e = err as Prisma.PrismaClientKnownRequestError;

                    console.log("Prisma error code:", e.code);

                    // Unique constraint violation
                    if (e.code === "P2002") {
                        return {
                            ok: false,
                            message: "This email is already registered.",
                        };
                    }

                    // Fallback for other errors
                    console.log("Signup error:", err);
                    return {
                        ok: false,
                        message: "An unexpected error occurred during signup.",
                    };
                }
            
            },
        },
    },
});