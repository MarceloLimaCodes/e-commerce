import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany } from "typeorm"
import { Product } from "./Product"
import { Venda } from "./Venda"

@Entity("itens_vendas")
export class ItensVenda {
    @PrimaryColumn()
    venda_id: string

    @PrimaryColumn()
    product_id: string

    @Column()
    qnt_product: number

    @Column()
    end_price_product: number

    @Column()
    desconto: number

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => Venda)
    @JoinColumn({ name: "venda_id" })
    venda: Venda

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product

}