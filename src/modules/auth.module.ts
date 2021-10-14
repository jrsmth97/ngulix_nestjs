import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from '../entities/user.entity'
import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service'

import { AuthController } from '../controllers/auth.controller'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, AuthService],
    controllers: [AuthController]
})
export class AuthModule { }