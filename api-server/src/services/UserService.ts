import AppDataSource from "../data-source"
import { User } from "../entities/User"
import bcrypt from 'bcryptjs'

type RegisterRequest = {
    name: string
    email: string
    password: string
}

export class CreateUserService {
   async execute({ name, email, password }: RegisterRequest) {
        const repo = AppDataSource.getRepository(User)

        if(await repo.findOneBy({ email })) {
            throw Error("Register in email already exists")
        }

        const hash = await bcrypt.hash(password, 10);

        let user = repo.create({
            name,
            email,
            password: hash
        })

        user.carteira = 1000

        await repo.save(user)

        return user
    }
}

export class GetUserService {
    async execute() {
        const repo = AppDataSource.getRepository(User)
        const users = await repo.find()
    
        return users
    }
}

type UpdateRequest = {
    id: string
    name: string
    email: string
    password: string
}

export class UpdateUserService {
    async execute({ id, name, email, password }: UpdateRequest ) {
        const repo = AppDataSource.getRepository(User)

        const user = await repo.findOneBy({ id })

        if(!user) {
            throw Error("User does not exist")
        }

        user.name = name ? name : user.name
        user.email = email ? email : user.email
        user.password = password ? password : user.password 

        await repo.save(user)

        return user

    }
}


type DeleteRequest = {
    id: string
}

export class DeleteUserService {
    async execute({ id }: DeleteRequest) {
        const repo = AppDataSource.getRepository(User)

        if(!await repo.findOneBy({ id })) {
            throw Error("User not exists")
        }

        await repo.delete({ id })
    }
}