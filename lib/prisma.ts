import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
}

// Check for DATABASE_URL at runtime
if (typeof window === 'undefined' && !process.env.DATABASE_URL) {
    console.error('CRITICAL: DATABASE_URL is not defined. Database operations will fail.');
    console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('SUPABASE')));
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ["error", "warn"],
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        }
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}