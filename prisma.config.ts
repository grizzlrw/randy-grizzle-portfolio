import { defineConfig, env } from "@prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "client", // Prisma 7 "client" engine
  datasource: {
    url: env("DATABASE_URL"),
  },
});