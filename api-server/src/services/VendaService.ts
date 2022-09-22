import AppDataSource from "../data-source"
import { Venda } from "../entities/Venda"

type VendaRequest = {
    user_id: string
}


export class CreateVendaService {
   async execute({ user_id }: VendaRequest) {
        const repo = AppDataSource.getRepository(Venda)

        if(await repo.findOneBy({ id: user_id })) {
            throw Error("Venda already exists")
        }

        const venda = repo.create({
            user_id,
        })

        await repo.save(venda)

        return venda
    } 
}


export class ReadVendaService {
    async execute() {
        const repo = AppDataSource.getRepository(Venda)
        const venda = await repo.find({
            relations: ["user"]
        })

        return venda
    }
}

type DeleteRequest = {
    id: string
}

export class DeleteVendaService {
    async execute({ id }: DeleteRequest) {
        const repo = AppDataSource.getRepository(Venda)

        if(!await repo.findOneBy({ id })) {
            throw Error("Venda does not exists")
        }

        await repo.delete({ id })
    }
}