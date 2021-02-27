import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/usersRepository'
import * as yup from 'yup'
import { AppError } from '../errors/appErrors'


class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    })

    //teste de validação metodo 1
    /*if(!(await schema.isValid(req.body))){
      return res.status(400).json({error:"Não foi possível validar usuário"})
    }*/

    try { await schema.validate(req.body, { abortEarly: false }) } catch (err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UsersRepository)
    const userAlradyExistis = await usersRepository.findOne({ email })
    const user = usersRepository.create({ name, email })

    if (userAlradyExistis) {
      throw new AppError("Usuário já existe");

    }

    await usersRepository.save(user);

    return res.status(201).json(user)
  }
}
export { UserController }
