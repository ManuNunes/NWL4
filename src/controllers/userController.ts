import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/usersRepository'
 

class UserController{
    async create(req:Request,res:Response){
        const {name,email} = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const userAlradyExistis = await usersRepository.findOne({email})
        const user = usersRepository.create({name,email})

        if(userAlradyExistis){
            res.status(400).json({text: "Usuário já existe"})
        }

        await usersRepository.save(user);
        
        return res.status(201).json(user)
    }
}
export { UserController }
