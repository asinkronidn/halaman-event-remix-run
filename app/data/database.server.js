import { PrismaClient } from '@prisma/client';

/**
 * @type PrismaClient
 */
const prisma = new PrismaClient();
prisma.$connect();

export { prisma };