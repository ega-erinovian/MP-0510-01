import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface GetCityQuery {
  countryId?: number;
  search?: string;
}

export const getCitiesService = async (query: GetCityQuery) => {
  try {
    const { countryId, search } = query;

    const whereClause: Prisma.CityWhereInput = {};

    if (countryId) {
      whereClause.countryId = countryId;
    }

    if (search) {
      whereClause.OR = [{ name: { contains: search, mode: "insensitive" } }];
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
