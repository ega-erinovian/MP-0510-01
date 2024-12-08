import { prisma } from "../../lib/prisma";

export const getCitiesService = async () => {
  try {
    const cities = prisma.city.findMany({
      include: {
        country: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return cities;
  } catch (error) {
    throw error;
  }
};
