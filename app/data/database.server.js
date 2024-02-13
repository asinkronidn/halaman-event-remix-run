import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'

/**
 * @type PrismaClient
 */
// const prisma = new PrismaClient();
const prisma = new PrismaClient().$extends(withAccelerate())
prisma.$connect();

export { prisma };