import { Request, Response } from "express";
import path from 'path';
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/appErrors";
import { SurveyUserRepository } from "../repositories/surveyUserRepository";
import { SurveysRepository } from "../repositories/suveysRepository";
import { UsersRepository } from "../repositories/usersRepository";
import sendMailService from "../services/sendMailService";

class SendMainController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;
    const usersRepository = getCustomRepository(UsersRepository)
    const surveyRepository = getCustomRepository(SurveysRepository)
    const surveyUsersRepository = getCustomRepository(SurveyUserRepository)
    const user = await usersRepository.findOne({ email })
    const surveys = await surveyRepository.findOne({ id: survey_id })

    const surveyUserExists = await surveyUsersRepository.findOne(
      {where:{user_id:user.id ,value:null},
      relations:["Usuário","Pesquisa REF"]})

    const npsPath = path.resolve(__dirname,"..","views","emails","npsmail.hbs")

    const variables = {
      name:user.name,
      title:surveys.title,
      description:surveys.description,
      id:"",
      link:process.env.URL_MAIL
      
    }

    if (!user) {
      throw new AppError("Usuário não existe");
      
    }
    if (!surveys) {
      throw new AppError("Pesquisa não existe");
    }
    if(surveyUserExists){
      variables.id = surveyUserExists.id
      await sendMailService.execute(email,surveys.title,variables,npsPath)
      return res.json(surveyUserExists)
    }
    
    const surveyUser = surveyUsersRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveyUsersRepository.save(surveyUser)
    variables.id = surveyUser.id
    await sendMailService.execute(email,surveys.title,variables,npsPath)

    return res.json(surveyUser)
  }
}

export { SendMainController };

