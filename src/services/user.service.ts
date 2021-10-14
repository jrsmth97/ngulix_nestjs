import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '../entities/user.entity'
import { UserDTO } from '../dto/user.dto'

import { hash } from 'bcryptjs'

@Injectable()
export class UserService {
   constructor(
       @InjectRepository(UserEntity)
       private userRepository: Repository<UserEntity>,
   ) {}

   public async showAll() {
       try {
           return await this.userRepository.find({})
       } catch(err) {
           console.error(err)
       }
   }

   public async create(data: UserDTO) {
       try {
        let message = 'User created successfully'

        // Check email is exist in database or not
        const userExist = await this.userRepository.findOne({ email: data.email })
        if (userExist) {
            message = 'User already registered with email'
            return { message }
        }

        // Hash password before inserting
        if (data.password) {
            data.password = await this.hashPassword(data.password)
        }

        // Save new user to database
        const user = this.userRepository.create(data)
        await this.userRepository.save(data)

        return { user, message }
       } catch(err) {
        console.error(err)
       }
   }

   public async show(id: number) {
       try {
           return await this.userRepository.findOne({ id })
       } catch(err) {
           console.error(err)
       }
   }

   public async update(id: number, data: Partial<UserDTO>) {
       try {
            // Hash password before inserting
            if (data.password) {
                data.password = await this.hashPassword(data.password)
            }
            
           await this.userRepository.update({ id }, data)
           return await this.userRepository.findOne({ id })
       } catch(err) {
           console.error(err)
       }
   }

   public async destroy(id: number) {
       try {
           await this.userRepository.delete({ id })
           return true
       } catch(err) {
           console.error(err)
       }
   }

   private async hashPassword(string) {
    try {
        const password = await hash(string, 10) // Salt
        return password
    } catch (err) {
        console.error(err)
    }

   }

}