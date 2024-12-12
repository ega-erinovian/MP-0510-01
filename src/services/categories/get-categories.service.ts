import { prisma } from "../../lib/prisma";

export const getCategoriesService = async () => {
  try {
    const categories = prisma.category.findMany();
    return categories;
  } catch (error) {
    throw error;
  }
};
