import AppDataSource from "../data-source"
import { Venda } from "../entities/Venda"
import { Product } from "../entities/Product"
import { ItensVenda } from "../entities/ItensVenda"
import { User } from "../entities/User"

type RegisterRequest = {
    venda_id: string
    product_id: string
    qnt_product: number
    desconto: number
}
// Assim que clicamos em comprar fazemos o update na quantidade de estoque e no valor do usuário

export class CreateItensVendaService {
   async execute({ venda_id, product_id, qnt_product, desconto }: RegisterRequest) {
        const repo = AppDataSource.getRepository(ItensVenda)
        const repovenda = AppDataSource.getRepository(Venda)
        const repoProduct = AppDataSource.getRepository(Product)
        const repoUser = AppDataSource.getRepository(User)

        const product = await repoProduct.findOneBy({ id: product_id })
        const venda = await repovenda.findOneBy({ id: venda_id })
        const user = await repoUser.findOneBy({ id: venda.user_id })

        if(!product) {
            throw Error("Product not find")
        }

        let end_price_product = product.price * qnt_product
        // end_price_product = end_price_product - (end_price_product * desconto / 100)

        product.qtd_estoque = product.qtd_estoque - qnt_product

        user.carteira = user.carteira - end_price_product

        const itens_vendas = repo.create({
            venda_id,
            product_id,
            qnt_product,
            desconto,
            end_price_product
        })

        await repo.save(itens_vendas)
        await repoProduct.save(product)
        await repoUser.save(user)

        return itens_vendas
    }
}

type VendaRequest = {
    venda_id: string
}


export class ReadAllItensVendasService {
    async execute() {
        const repo = AppDataSource.getRepository(ItensVenda)

        const venda = await repo.find({
            relations: ["venda", "product"]
        })

        return venda
    }
}


type DeleteRequest = {
    venda_id: string
}

export class DeleteItensVendaService {
    async execute({ venda_id }: DeleteRequest) {
        const repo = AppDataSource.getRepository(ItensVenda)

        if(!await repo.findOneBy({ venda_id })) {
            throw Error("Venda not exists")
        }

        await repo.delete({ venda_id })
    }
}