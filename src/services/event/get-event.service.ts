import { prisma } from "../../lib/prisma";

export const getEventService = async (id: number) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        city: {
          select: {
            name: true,
            countryId: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        organizer: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  } catch (error) {
    throw error;
  }
};
