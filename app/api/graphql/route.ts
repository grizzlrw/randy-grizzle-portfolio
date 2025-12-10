import { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";

const yoga = createYoga<{
    req: NextRequest;
}>({
    schema,
    graphqlEndpoint: "/api/graphql",
    fetchAPI: { Request, Response },
})

export const GET = (req: NextRequest) => yoga.handleRequest(req, { req });
export const POST = (req: NextRequest) => yoga.handleRequest(req, { req });