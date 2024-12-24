import { prisma } from "../../lib/prisma";

export const deleteEventService = async (id: number) => {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
    });

    if (!event) {
      throw new Error("Event not found.");
    }

    await prisma.event.update({
      where: { id },
      data: { isDeleted: true },
    });

    return { message: "Event deleted successfully." };
  } catch (error) {
    throw error;
  }
};
