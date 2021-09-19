import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { classToClass } from "class-transformer";

import { Student } from "../database/entities/Student";
import { AppError } from "../errors/AppError";

export class StudentController {
  static async index(req: Request, res: Response) {
    try {
      const ormRepository = getRepository(Student);

      const page = Number(req.params.page) || 1;

      const skip = (page - 1) * 15;

      const [students, total] = await ormRepository.findAndCount({
        select: ["id", "name", "address"],
        order: { name: "ASC" },
        take: 15,
        skip: skip,
      });

      return res.json({
        students: classToClass(students),
        pagination: {
          page,
          pageSize: 15,
          totalDocs: total,
          totalPages: Math.ceil(total / 15),
        },
      });
    } catch (error) {
      throw new AppError("Error while trying to list students.", 500);
    }
  }

  static async view(req: Request, res: Response) {
    try {
      const ormRepository = getRepository(Student);

      const { id } = req.params;

      const student = await ormRepository.findOne({
        where: { id },
      });

      if (!student) {
        throw new AppError("Unable to find a student with this id.", 400);
      }

      return res.json(classToClass(student));
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Error while trying to find student.", 500);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const ormRepository = getRepository(Student);

      const { name, address } = req.body;

      const student = ormRepository.create({ name, address });

      await ormRepository.save(student);

      return res.json(classToClass(student));
    } catch (error) {
      throw new AppError("Error while trying to create student.", 500);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const ormRepository = getRepository(Student);

      const { id, name, address } = req.body;

      const student = await ormRepository.findOne({
        where: { id },
      });

      if (!student) {
        throw new AppError("Unable to find a student with this id.", 400);
      }

      const updatedStudent = await ormRepository.save({
        ...student,
        name,
        address,
      });

      return res.json(classToClass(updatedStudent));
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Error while trying to update student.", 500);
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

      await ormRepository.remove([student]);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Error while trying to delete student.", 500);
    }
  }
}
