import { Router } from "express";
import { AppError } from "../errors/AppError";
import { studentRoutes } from "./student.routes";

export const routes = Router();

routes.use("/students", studentRoutes);
