import { Request, Response } from "express"
import { CreateProductService, ReadProductService, UpdateProductService, DeleteProductService } from "../services/ProductService"

export class CreateProductController {
    async handle(request: Request, response: Response) {
        try {
            const { name, price, qtd_estoque, category_id, description } = request.body
    
            const service = new CreateProductService()
            const result = await service.execute({ name, price, qtd_estoque, category_id, description })
    
            return response.json(result)

        }catch(err){
            return response.status(400).json(err.message);
        }
    }
}

export class ReadProductsController {
    async handle(request: Request, response: Response) {
        try {
            const service = new ReadProductService()
            const products = await service.execute()
    
            return response.json(products)

        }catch(err){
            return response.status(400).json(err.message);
        }
    }
}

export class UpdateProductController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
            const { name, price, qtd_estoque, category_id, description } = request.body
    
            const service = new UpdateProductService()
            const result = await service.execute({ id, name, price, qtd_estoque, category_id, description })
     
            return response.json(result)

        }catch(err){
            return response.status(400).json(err.message);
        }
    }
}

export class DeleteProductController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
    
            const service = new DeleteProductService()
            await service.execute({ id })
    
            return response.status(204).end()

        }catch(err){
            return response.status(400).json(err.message);
        }
    }
}