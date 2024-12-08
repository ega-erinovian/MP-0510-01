import { prisma } from "../../lib/prisma";

export const getCitiesByCountryService = async (country: string) => {
  try {
    const events = prisma.city.findMany({
      where: {
        country: {
          name: country,
        },
      },
      include: {
        country: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return events;
  } catch (error) {
    throw error;
  }
};
