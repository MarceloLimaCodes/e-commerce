import { Request, Response } from "express"
import { CreateCategoryService, ReadCategoriesService, UpdateCategoryService, DeleteCategoryService } from "../services/CategoryService"

export class CreateCategoryController {
    async handle(request: Request, response: Response) {
        try {
            const { name, description } = request.body
    
            const service = new CreateCategoryService()
            const result = await service.execute({ name, description })
        
            return response.json(result)

        } catch(err) {
            return response.status(400).json(err.message);
        }
    }
}

export class ReadCategoriesController {
    async handle(request: Request, response: Response) {
        try {
            const service = new ReadCategoriesService()
    
            const categories = await service.execute()
    
            return response.json(categories)

        } catch(err) {
            return response.status(400).json(err.message);
        }
    }
}

export class UpdateCategoryController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
            const { name, description } = request.body
    
            const service = new UpdateCategoryService()
    
            const result = await service.execute({ id, name, description })
    
            return response.json(result)

        } catch(err) {
            return response.status(400).json(err.message);
        }
    }
}

export class DeleteCategoryController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
    
            const service = new DeleteCategoryService()
    
            await service.execute({ id })
    
            return response.status(204)

        } catch(err) {
            return response.status(400).json(err.message);
        } 
    }
}