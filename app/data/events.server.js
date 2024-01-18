import { prisma } from './database.server';

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { starttime: 'desc' },
    });
    return events;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getEventById(id) {
  try {
    const event = await prisma.event.findFirst({ where: { id } });
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getEventByUrl(url) {
  try {
    const event = await prisma.event.findFirst({ where: { url } });
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
}