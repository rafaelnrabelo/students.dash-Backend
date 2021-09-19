import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { errors } from "celebrate";
import "express-async-errors";

import uploadConfig from "./config/upload";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";

import "./database/connection";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/files", express.static(uploadConfig.uploadsFolder));

app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});
