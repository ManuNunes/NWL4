import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/surveyUserRepository";
import { SurveysRepository } from "../repositories/suveysRepository";
import { UsersRepository } from "../repositories/usersRepository";

class SendMainController{
  async execute(req:Request,res:Response){
    const {email,survey_id} = req.body;
    const usersRepository = getCustomRepository(UsersRepository)
    const surveyRepository = getCustomRepository(SurveysRepository)
    const surveyUsersRepository = getCustomRepository(SurveyUserRepository)
    const userExists = await usersRepository.findOne({email})
    const surveyExists = await surveyRepository.findOne({id: survey_id})

    if(!userExists){
      return res.status(400).json({error:"Usuário não existe!"})
    }
    if(!surveyExists){
      return res.status(400).json({error: "Pesquisa não existe"})
    }

    const surveyUser = surveyUsersRepository.create({
      user_id: userExists.id,
      survey_id:survey_id
    })

    await surveyUsersRepository.save(surveyUser)

    return res.json(surveyUser)
  }
}

export { SendMainController };

