import { Router } from 'express'
import { SendMainController } from './controllers/sendMailController'
import { SurveyController } from './controllers/surveyController'
import { UserController } from './controllers/userController'

const userController =  new UserController()
const surveysController = new SurveyController()
const sendMailController = new SendMainController()

const routes = Router()

routes.post("/users",userController.create)
routes.post("/surveys",surveysController.create)
routes.get("/surveys",surveysController.show)
routes.post("/sendmail",sendMailController.execute)

export { routes }
