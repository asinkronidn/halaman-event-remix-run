import { prisma } from './database.server';

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { starttime: 'desc' },
      cacheStrategy: {
        ttl: 43200, // 12 hours
      },    
    });
    return events;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getEventById(id) {
  try {
    const event = await prisma.event.findFirst({ where: { id },
      cacheStrategy: {
        ttl: 43200, // 12 hours
      },
    });
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getEventByUrl(url) {
  try {
    const event = await prisma.event.findFirst({ where: { url },
      cacheStrategy: {
        ttl: 43200, // 12 hours
      },
    });
    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
}