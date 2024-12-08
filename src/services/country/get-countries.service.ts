import { prisma } from "../../lib/prisma";

export const getCountriesService = async () => {
  try {
    const countries = prisma.country.findMany();
    return countries;
  } catch (error) {
    throw error;
  }
};
