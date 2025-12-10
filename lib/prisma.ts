import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
}

// Add connection validation
if (!process.env.DATABASE_URL) {
    throw new Error(
        'DATABASE_URL is not defined. Please check your .env.local file.'
    );
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