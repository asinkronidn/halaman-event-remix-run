import { prisma } from './database.server';

export async function addRegistration(registrationData) {
  try {
    return await prisma.eventRegistration.create({
      data: {
        eventId: registrationData.eventId,
        email: registrationData.email,
        nama: registrationData.nama,
        kota: registrationData.kota,
        phone: registrationData.phone,
        dari_mana_mendapat_info_workshop: registrationData.dari_mana_mendapat_info_workshop
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}