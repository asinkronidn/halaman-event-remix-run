import { prisma } from './database.server';

export async function getMembers() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { starttime: 'desc' },
    });
    return members;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMemberById(id) {
  try {
    const member = await prisma.member.findFirst({ where: { id } });
    return member;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMemberByEmail(email) {
  try {
    const member = await prisma.member.findFirst({ where: { email } });
    return member;
  } catch (error) {
    console.log(error);
    throw error;
  }
}