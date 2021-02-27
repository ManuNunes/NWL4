import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveyUserRepository } from "../repositories/surveyUserRepository";

class NpsController{
  async execute(req:Request, res:Response){
    const {survey_id} = req.params
    const surveyUsersRepository = getCustomRepository(SurveyUserRepository)

    const surveyUser = await surveyUsersRepository.find({ survey_id, value:Not(IsNull()) })

    const detractor = surveyUser.filter(
      (survey)=> survey.value >= 0 && survey.value <=6
    ).length

    const passive = surveyUser.filter(
      (survey)=> survey.value >=7 && survey.value <= 8
    ).length;

    const promoters = surveyUser.filter(
      (survey)=> survey.value >= 9 && survey.value <=10
    ).length

    const totalAnswers = surveyUser.length

    const result = Number(((promoters - detractor)/totalAnswers * 100).toFixed(2))

    return res.json({
      promoters,
      passive,
      detractor,
      totalAnswers,
      nps:result
    })
  }
}
export{NpsController}