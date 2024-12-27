import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface GetCountriesQuery {
  cityId?: number;
}

export const getCountriesService = async (query: GetCountriesQuery) => {
  try {
    const { cityId } = query;

    const whereClause: Prisma.CountryWhereInput = {};

    if (cityId) {
      whereClause.cities = {
        some: {
          id: cityId,
        },
      };
    }

    const countries = prisma.country.findMany({
      where: whereClause,
      include: {
        cities: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return countries;
  } catch (error) {
    throw error;
  }
};
