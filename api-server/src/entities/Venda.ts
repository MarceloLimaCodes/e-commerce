import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { v4 as uuid } from "uuid"


@Entity("vendas")
export class Venda {
    @PrimaryColumn()
    id: string

    @Column()
    user_id: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }

}