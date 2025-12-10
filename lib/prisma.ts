import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
}

// Check for DATABASE_URL only at runtime, not during build
if (typeof window === 'undefined' && !process.env.DATABASE_URL && process.env.NODE_ENV !== 'production') {
    console.warn('WARNING: DATABASE_URL is not defined. Database operations will fail.');
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ["query", "error", "warn"] : ["error"],
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        }
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}