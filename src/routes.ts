import { Router } from 'express'
import { SurveyController } from './controllers/surveyController'
import { UserController } from './controllers/userController'

const userController =  new UserController()
const surveysController = new SurveyController()

const routes = Router()

routes.post("/users",userController.create)
routes.post("/surveys",surveysController.create)
routes.get("/surveys",surveysController.show)

export { routes }
