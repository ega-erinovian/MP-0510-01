import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
