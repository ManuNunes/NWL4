import { Router } from 'express'
import { AnswerController } from './controllers/answerController'
import { NpsController } from './controllers/npsController'
import { SendMainController } from './controllers/sendMailController'
import { SurveyController } from './controllers/surveyController'
import { UserController } from './controllers/userController'

const userController = new UserController()
const surveysController = new SurveyController()
const sendMailController = new SendMainController()
const answerController = new AnswerController()
const npsControler = new NpsController()

const routes = Router()

routes.post("/users", userController.create)
routes.post("/surveys", surveysController.create)
routes.get("/surveys", surveysController.show)
routes.post("/sendmail", sendMailController.execute)
routes.get("/answers/:value", answerController.execute)
routes.get("/nps/:survey_id", npsControler.execute)

export { routes }
