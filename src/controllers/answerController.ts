import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/appErrors";
import { SurveyUserRepository } from "../repositories/surveyUserRepository";

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params
    const { u } = req.query
    const surveyUsersRepository = getCustomRepository(SurveyUserRepository)
    const surveyUser = await surveyUsersRepository.findOne({ id: String(u) })

    if (!surveyUser) {
      throw new AppError("Pesquisa desse usuário não existe");
    }
    surveyUser.value = Number(value)

    await surveyUsersRepository.save(surveyUser)

    return res.status(200).json(surveyUser)
  }

}

export { AnswerController };
