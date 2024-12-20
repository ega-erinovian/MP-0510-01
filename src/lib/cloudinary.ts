import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import * as streamifier from "streamifier";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../config";

cloudinary.config({
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  cloud_name: CLOUDINARY_CLOUD_NAME,
});

export const cloudinaryUpload = (
  file: Express.Multer.File
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      (error, result: UploadApiResponse) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

// Take the file name
const extractPublicIdFromUrl = (url: string) => {
  const urlParts = url.split("/");
  const publicIdWithExtension = urlParts[urlParts.length - 1];
  const publicId = publicIdWithExtension.split(".")[0];

  return publicId;
};

export const cloudinaryRemove = async (secure_url: string) => {
  try {
    const publicId = extractPublicIdFromUrl(secure_url);
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw error;
  }
};
