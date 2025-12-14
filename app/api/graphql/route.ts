import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";
import { NextRequest, NextResponse } from "next/server";

const { handleRequest } = createYoga({
    schema,
    graphqlEndpoint: "/api/graphql",
    fetchAPI: { Response },
    cors: {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS']
    }
});

export async function GET(request: NextRequest) {
    return handleRequest(request, {});
}

export async function POST(request: NextRequest) {
    return handleRequest(request, {});
}

export async function OPTIONS(_request: NextRequest) {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
        },
    });
}