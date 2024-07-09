import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prismaDb: PrismaClient | undefined;
};

export const prismaDb = globalForPrisma.prismaDb ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaDb = prismaDb;
