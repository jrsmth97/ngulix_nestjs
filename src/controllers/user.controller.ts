import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { UserDTO } from '../dto/user.dto'

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        const results = await this.userService.showAll()

        return {
            statusCode: results.length === 0 ? HttpStatus.NOT_FOUND : HttpStatus.OK ,
            data: results
        }
    }
    
    @Post()
    async createUser(@Body() data: UserDTO) {
        const result = await this.userService.create(data)

        return {
            statusCode: result ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
            message: result ? 'User added successfully' : 'Error Happened',
            data: result,
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        const result = await this.userService.show(id)

        return {
            statusCode: result ? HttpStatus.OK : HttpStatus.NOT_FOUND,
            data: result ?? 'Not Found',
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() data: UserDTO) {
        const result = await this.userService.update(id, data)

        return {
            statusCode: result ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            data: result ?? null
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        const deleted = await this.userService.destroy(id)

        return {
            statusCode: deleted ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            message: deleted ? 'User deleted successfully' : 'Error Happened'
        }
    }
}