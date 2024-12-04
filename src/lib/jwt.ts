import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "./env";
import { TokenExpiredError, verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send({
      message: "Authentication failed. Token is missing",
    });

    return;
  }

  verify(token, JWT_SECRET_KEY!, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        res.status(401).send({ message: "Token expired" });
      } else {
        res.status(401).send({ message: "Invalid Token" });
      }
    }

    res.locals.user = payload;

    next();
  });
};
