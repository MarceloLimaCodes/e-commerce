import AppDataSource from "../data-source"
import { Category } from "../entities/Category"

type CategoryRequest = {
    name: string
    description: string
}


export class CreateCategoryService {
   async execute({ name, description }: CategoryRequest) {
        const repo = AppDataSource.getRepository(Category)

        if(await repo.findOneBy({ name })) {
           throw Error("Category already exists")
        }

        const category = repo.create({
            name,
            description
        })

        await repo.save(category)

        return category
    } 
}

export class ReadCategoriesService {
    async execute() {
        const repo = AppDataSource.getRepository(Category)
        const categories = await repo.find()

        return categories
    }
}

type UpdateRequest = {
    id: string
    name: string
    description: string
}

export class UpdateCategoryService {
    async execute({ id, name, description }: UpdateRequest ) {
        const repo = AppDataSource.getRepository(Category)

        const category = await repo.findOneBy({ id })

        if(!category) {
            throw Error("Category does not exist")
        }

        category.name = name ? name : category.name 
        category.description = description ? description : category.description

        await repo.save(category)

        return category
    }
}

type DeleteRequest = {
    id: string
}

export class DeleteCategoryService {
    async execute({ id }: DeleteRequest) {
        const repo = AppDataSource.getRepository(Category)

        if(!await repo.findOneBy({ id })) {
            throw Error("Category does not exists")
        }

        await repo.delete({ id })
    }
}