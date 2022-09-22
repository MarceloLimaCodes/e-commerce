import { Request, Response } from "express"
import { CreateVendaService, ReadVendaService, DeleteVendaService } from "../services/VendaService"

export class CreateVendaController {
    async handle(request: Request, response: Response) {
        try {
            const { user_id } = request.body
    
            const service = new CreateVendaService()
            const result = await service.execute({ user_id })
    
            return response.json(result)

        }catch(err){
            return response.status(400).json(err.message);
        }
    }
}


export class ReadVendasController {
    async handle(request: Request, response: Response) {
        try {
            const service = new ReadVendaService() 
            const vendas = await service.execute()
    
            return response.json(vendas)

        }catch(err){
            return response.status(400).json(err.message)
        }
    }
}

export class DeleteVendaController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
    
            const service = new DeleteVendaService()
    
            await service.execute({ id })
    
            return response.status(204).end()

        }catch(err){
            return response.status(400).json(err.message);
        }
    }
}