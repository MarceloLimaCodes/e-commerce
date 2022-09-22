const jwt = require('jsonwebtoken');
import { Response, Request } from "express";
const authConfig = require('../config/auth');
import { AuthService } from "../services/AuthService"
import { User } from "../entities/User"

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

export class AuthController {
    async handle(req: Request, res: Response) {
        try{
            const { email, password } = req.body;

            const service = new AuthService();
    
            const user: User = await service.execute({ email, password });
            
            return res.json({ 
                user,
                token: generateToken({ id: user.id  })
            });
    
        } catch(err) {
            return res.status(400).json(err.message);
        }
    }
}