import { prisma } from "../../lib/prisma";

export const getCitiesByCountryService = async (country: string) => {
  try {
    const cities = prisma.city.findMany({
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
    return cities;
  } catch (error) {
    throw error;
  }
};
