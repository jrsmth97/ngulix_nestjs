import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { Config } from '../config'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, next: NextFunction): Promise<any> {
        const authHeaders = req.headers.authorization
        
        if(!authHeaders) return { statusCode: 401 }

        const token = (authHeaders as string).split(' ')[1]

        if(!token) return { statusCode: 401 }

        await verify(token, Config.JWT_SECRET, (err, decoded) => {
            if(err) throw err
            
            next()
        })
    
    }
}