import { Injectable } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Config } from "../config"

import { sign } from 'jsonwebtoken'
import { UserEntity } from "../entities/user.entity"

import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    public async login(user: UserEntity): Promise<any | { status: number }> {
        return this.validate(user)
            .then(userData => {
                if (!userData) return { statusCode: 401 }

                const accessToken = sign({ email: userData.email }, Config.JWT_SECRET, {
                    expiresIn: Config.JWT_EXPIRED
                })

                return {
                    expires_in: Config.JWT_EXPIRED,
                    access_token: accessToken,
                    user_email: userData.email,
                    statusCode: 200, 
                }
            })
    }

    private async validate(user: UserEntity): Promise<any> {
        const userData = await this.userRepository.findOne({ email: user.email })

        if(!userData) return

        if(user.password) {
            const checked = await this.checkPassword(user.password, userData.password)
            if(!checked) return 
        }

        return userData
    }

    private async checkPassword(inputPassword, currentPassword) {
        const passed = compare(inputPassword, currentPassword)
        
        if(passed) return passed

        return { statusCode: 401 }
    }
}