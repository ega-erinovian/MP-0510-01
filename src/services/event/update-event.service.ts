import { cloudinaryUpload } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

interface UpdateEventBody {
  title?: string;
  description?: string;
  price?: number;
  availableSeats?: number;
  startDate?: Date;
  endDate?: Date;
  categoryId?: number;
  cityId?: number;
}

export const updateEventService = async (
  body: UpdateEventBody,
  id: number,
  thumbnnail?: Express.Multer.File
) => {
  try {
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      throw new Error("Event not found");
    }

    let secure_url = existingEvent.thumbnnail;

    if (thumbnnail) {
      secure_url = (await cloudinaryUpload(thumbnnail)).secure_url;
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...body,
        price: Number(body.price),
        availableSeats: Number(body.availableSeats),
        categoryId: Number(body.categoryId),
        cityId: Number(body.cityId),
        thumbnnail: secure_url,
      },
    });

    return updatedEvent;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error"
    );
  }
};
