import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";
import { NextRequest, NextResponse } from "next/server";

const { handleRequest } = createYoga({
    schema,
    graphqlEndpoint: "/api/graphql",
    fetchAPI: { Response }
});

export async function GET(request: NextRequest) {
    return handleRequest(request, {});
}

export async function POST(request: NextRequest) {
    return handleRequest(request, {});
}