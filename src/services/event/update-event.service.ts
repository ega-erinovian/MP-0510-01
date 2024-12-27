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

    const updatedData: Partial<UpdateEventBody> & { thumbnnail?: string } = {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.price !== undefined && { price: Number(body.price) }),
      ...(body.availableSeats !== undefined && {
        availableSeats: Number(body.availableSeats),
      }),
      ...(body.startDate !== undefined && { startDate: body.startDate }),
      ...(body.endDate !== undefined && { endDate: body.endDate }),
      ...(body.categoryId !== undefined && {
        categoryId: Number(body.categoryId),
      }),
      ...(body.cityId !== undefined && { cityId: Number(body.cityId) }),
      thumbnnail: secure_url,
    };

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updatedData,
    });

    return updatedEvent;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error"
    );
  }
};
