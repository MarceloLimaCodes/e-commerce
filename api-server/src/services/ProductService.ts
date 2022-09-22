import AppDataSource from "../data-source"
import { Product } from "../entities/Product"

type RegisterRequest = {
    name: string
    price: number
    qtd_estoque: number
    category_id: string
    description: string
}


export class CreateProductService {
   async execute({ name, price, qtd_estoque, category_id, description }: RegisterRequest) {
        const repo = AppDataSource.getRepository(Product)
 
        if(await repo.findOneBy({ name })) {
            throw Error("Product already exists")
        }

        const product = repo.create({
            name,
            price,
            qtd_estoque,
            category_id,
            description
        })

        await repo.save(product)

        return product
    }
}


export class ReadProductService {
    async execute() {
        const repo = AppDataSource.getRepository(Product)

        const products = await repo.find({
            relations: ["category"]
        })

        return products
    }
}

type UpdateRequest = {
    id: string
    name: string
    price: number
    qtd_estoque: number
    category_id: string
    description: string
}

export class UpdateProductService {
    async execute({ id, name, price, qtd_estoque, category_id, description }: UpdateRequest ) {
        const repo = AppDataSource.getRepository(Product)

        const product = await repo.findOneBy({ id })

        if(!product) {
            throw Error("Product does not exist")
        }

        product.name = name ? name : product.name
        product.price = price ? price : product.price
        product.qtd_estoque = qtd_estoque ? qtd_estoque : product.qtd_estoque
        product.category_id = category_id ? category_id : product.category_id
        product.description = description ? description : product.description
        

        await repo.save(product)

        return product

    }
}


type DeleteRequest = {
    id: string
}

export class DeleteProductService {
    async execute({ id }: DeleteRequest) {
        const repo = AppDataSource.getRepository(Product)

        if(!await repo.findOneBy({ id })) {
            throw Error("Product not exists")
        }

        await repo.delete({ id })
    }
}