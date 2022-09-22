import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Category } from "./Category"


@Entity("products")
export class Product {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    qtd_estoque: number
    
    @Column()
    category_id: string
    
    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category
    
    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}