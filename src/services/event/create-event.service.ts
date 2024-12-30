import { Event } from "@prisma/client";
import { cloudinaryUpload } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

export const createEventService = async (
  body: Event,
  thumbnnail: Express.Multer.File
) => {
  try {
    const { title } = body;
    const existingEvent = await prisma.event.findFirst({
      where: { title },
    });

    if (existingEvent) {
      throw new Error("Event Exists");
    }

    const { secure_url } = await cloudinaryUpload(thumbnnail);

    const createEvent = await prisma.event.create({
      data: {
        ...body,
        thumbnnail: secure_url,
        price: Number(body.price),
        availableSeats: Number(body.availableSeats),
        categoryId: Number(body.categoryId),
        cityId: Number(body.cityId),
        userId: Number(body.userId),
      },
    });

    return createEvent;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error"
    );
  }
};
