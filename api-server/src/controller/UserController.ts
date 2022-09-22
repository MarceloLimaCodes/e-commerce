import { Request, Response } from "express"
import { CreateUserService, GetUserService, UpdateUserService, DeleteUserService } from "../services/UserService"

export class CreateUserController {
    async handle(request: Request, response: Response) {
        try {
            const { name, email, password } = request.body
    
            const service = new CreateUserService()
            const result = await service.execute({ name, email, password })
    
            return response.json(result)

        } catch(err) {
            return response.status(400).json(err.message);
        }
    }
}

export class GetUserController {
    async handle(request: Request, response: Response) {
        try {
            const service = new GetUserService()
            const users = await service.execute()
    
            return response.json(users)
            
        } catch(err) {
            return response.status(400).json(err.message)
        }

    }
}


export class UpdateUserController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
            const { name, email, password } = request.body
    
            const service = new UpdateUserService()
            const result = await service.execute({ id, name, email, password })
    
            return response.json(result)

        } catch(err) {
            return response.status(400).json(err.message);
        }
    }
}

export class DeleteUserController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
            
            const service = new DeleteUserService()
            await service.execute({ id })

    
            return response.status(204).end()

        }catch(err){
            return response.status(400).json(err.message);
        }
    }
}