import { Request, Response } from "express";
import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";
import { classToClass } from "class-transformer";

import { Student } from "../database/entities/Student";
import { AppError } from "../errors/AppError";
import uploadConfig from "../config/upload";

export class StudentAvatarController {
  static async update(req: Request, res: Response) {
    try {
      const ormRepository = getRepository(Student);

      const { id } = req.params;

      const student = await ormRepository.findOne({
        where: { id },
      });

      if (!student) {
        throw new AppError("Unable to find a student with this id.", 400);
      }
      if (!req.file?.filename) {
        throw new AppError("Error with the student avatar, try again", 400);
      }

      // Exclui o avatar atual caso exista um
      if (student.avatar) {
        const filePath = path.resolve(
          uploadConfig.uploadsFolder,
          student.avatar
        );

        try {
          await fs.promises.stat(filePath);
          await fs.promises.unlink(filePath);
        } catch {}
      }

      const { filename } = req.file;

      await fs.promises.rename(
        path.resolve(uploadConfig.tmpFolder, filename),
        path.resolve(uploadConfig.uploadsFolder, filename)
      );

      const updatedStudent = await ormRepository.save({
        ...student,
        avatar: filename,
      });

      return res.json(classToClass(updatedStudent));
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        "Error while trying to update the student avatar.",
        500
      );
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const ormRepository = getRepository(Student);

      const { id } = req.params;

      const student = await ormRepository.findOne({
        where: { id },
      });

      if (!student) {
        throw new AppError("Unable to find a student with this id.", 400);
      }

      if (!student.avatar) {
        return res.status(204).send();
      }

      const filePath = path.resolve(uploadConfig.uploadsFolder, student.avatar);

      try {
        await fs.promises.stat(filePath);
        await fs.promises.unlink(filePath);
      } catch {}

      await ormRepository.save({
        ...student,
        avatar: null,
      });

      return res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Error while trying to delete student.", 500);
    }
  }
}
