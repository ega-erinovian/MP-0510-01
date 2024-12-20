import { NextFunction, Request, Response } from "express";
import { fromBuffer } from "file-type";

export const fileFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/avif",
      "image/jpg",
      "image/webp",
      "image/heif",
      "image/heic",
    ];

    for (const fieldname in files) {
      const fileArray = files[fieldname];

      for (const file of fileArray) {
        const type = await fromBuffer(file.buffer);

        if (!type || !allowedTypes.includes(type.mime)) {
          throw new Error(`File type ${type?.mime} is not allowed`);
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
