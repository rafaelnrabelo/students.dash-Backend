import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import multer from "multer";

import { StudentController } from "../controllers/student.controller";
import { StudentAvatarController } from "../controllers/studentAvatar.controller";
import uploadConfig from "../config/upload";

export const studentRoutes = Router();
const upload = multer(uploadConfig);

studentRoutes.get(
  "/list/:page",
  celebrate({
    [Segments.PARAMS]: {
      page: Joi.number(),
    },
  }),
  StudentController.index
);

// Listar
studentRoutes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  StudentController.view
);
// Atualizar
studentRoutes.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string(),
      address: Joi.string(),
    },
  }),
  StudentController.update
);
// Deletar
studentRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  StudentController.delete
);
// Criar
studentRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  StudentController.create
);
// Atualizar Avatar
studentRoutes.patch(
  "/avatar/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  upload.single("avatar"),
  StudentAvatarController.update
);
// Deletar Avatar
studentRoutes.delete(
  "/avatar/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  StudentAvatarController.delete
);
