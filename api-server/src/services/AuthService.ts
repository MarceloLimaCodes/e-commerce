import AppDataSource from "../data-source"
import { User } from "../entities/User"
import bcrypt from 'bcryptjs'

type AuthRequest = {
    email: string,
    password: string
}

export class AuthService {
    async execute({ email, password }: AuthRequest) {
        const repo = AppDataSource.getRepository(User)
        
        const user = await repo.findOneBy({ email })

        if(!user) {
            throw Error("User not exists")
            
        } else {
            if(await bcrypt.compare(password, user.password)) {
                return user

            } else {
                throw Error("Password wrong")
            }
        }
    }
}