import { prisma } from './database.server';

export async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    return user;
  } catch (error) {
    throw error;
  }
}