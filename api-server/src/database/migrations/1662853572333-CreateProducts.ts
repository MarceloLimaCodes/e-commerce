import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProducts1662853572333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "price",
                        type: "numeric"
                    },
                    {
                        name: "qtd_estoque",
                        type: "numeric"
                    },
                    {
                        name: "category_id",
                        type: "uuid"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }

                ],
                foreignKeys: [
                    {
                        name: "fk_products_category",
                        columnNames: ["category_id"],
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
