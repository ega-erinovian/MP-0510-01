import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface GetCityQuery {
  countryId?: number;
}

export const getCitiesService = async (query: GetCityQuery) => {
  try {
    const { countryId } = query;

    const whereClause: Prisma.CityWhereInput = {};

    if (countryId) {
      whereClause.countryId = countryId;
    }

    const cities = prisma.city.findMany({
      where: whereClause,
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
