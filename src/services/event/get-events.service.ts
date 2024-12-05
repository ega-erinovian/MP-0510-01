import { prisma } from "../../lib/prisma";

export const getEventsService = async () => {
  try {
    const evenets = prisma.event.findMany();
    return evenets;
  } catch (error) {
    throw error;
  }
};
