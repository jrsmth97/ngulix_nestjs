import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'
import { UserEntity } from '../entities/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule {}