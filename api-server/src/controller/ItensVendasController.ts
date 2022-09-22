import { Request, Response } from "express"
import { CreateItensVendaService, ReadAllItensVendasService, DeleteItensVendaService } from "../services/ItensVendasService"

export class CreateItensVendasController {
    async handle(request: Request, response: Response) {
        try {
            const { venda_id, product_id, qnt_product, desconto } = request.body
    
            const service = new CreateItensVendaService()
            const result = await service.execute({ venda_id, product_id, qnt_product, desconto })

            return response.json(result)

        }catch(err){
            return response.status(400).json(err.message);
        }
    }
}



export class ReadAllItensVendasController {
    async handle(request: Request, response: Response) {
        try {
            const service = new ReadAllItensVendasService()
            const products = await service.execute()
    
            return response.json(products)
        } catch(err) {
            return response.status(400).json(err.message);
        }
    }
}

export class DeleteItensVendasController {
    async handle(request: Request, response: Response) {
        try {

            const { venda_id } = request.params
    
            const service = new DeleteItensVendaService()
            await service.execute({ venda_id })
    
            return response.status(204).end()
        }catch(err){
            return response.status(400).json(err.message);
        }
    }
}