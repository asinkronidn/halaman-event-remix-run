// import { PrismaClient as PrismaClientEdge  } from '@prisma/client/edge';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'

/**
 * @type PrismaClient
 */
const prisma = new PrismaClient();
// let prisma = null;
// if (typeof EdgeRuntime !== 'string') {
//     prisma = new PrismaClientEdge()
// } else {
//     prisma = new PrismaClient()
// }
// prisma = prisma.$extends(withAccelerate())
prisma.$connect();

export { prisma };