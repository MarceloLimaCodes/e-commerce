import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateItensVendas1662853601939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "itens_vendas",
                columns: [
                    {
                        name: "venda_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "qnt_product",
                        type: "numeric"
                    },
                    {
                        name: "end_price_product",
                        type: "numeric"
                    },
                    {
                        name: "desconto",
                        type: "numeric"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }

                ],
                foreignKeys: [
                    {
                        name: "fk_itens_vendas_venda",
                        columnNames: ["venda_id"],
                        referencedTableName: "vendas",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_itens_vendas_product",
                        columnNames: ["product_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("itens_vendas")
    }

}
