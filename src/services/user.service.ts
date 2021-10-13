import { Injectable, Res, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '../entities/user.entity'
import { UserDTO } from '../dto/user.dto'

import { Request, Response } from 'express'

@Injectable()
export class UserService {
   constructor(
       @InjectRepository(UserEntity)
       private userRepository: Repository<UserEntity>,
   ) {}

   async showAll() {
       try {
           return await this.userRepository.find({})
       } catch(err) {
           console.error(err)
       }
   }

   async create(data: UserDTO) {
       try {
        const user = this.userRepository.create(data)
        await this.userRepository.save(data)

        return user
       } catch(err) {
        console.error(err)
       }
   }

   async show(id: number) {
       try {
           return await this.userRepository.findOne({ id })
       } catch(err) {
           console.error(err)
       }
   }

   async update(id: number, data: Partial<UserDTO>) {
       try {
           await this.userRepository.update({ id }, data)
           return await this.userRepository.findOne({ id })
       } catch(err) {
           console.error(err)
       }
   }

   async destroy(id: number) {
       try {
           await this.userRepository.delete({ id })
           return true
       } catch(err) {
           console.error(err)
       }
   }

}