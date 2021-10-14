import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { UserEntity } from '../entities/user.entity'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    
    @Post('login')
    public async login(@Body() user: UserEntity): Promise<any> {
        return this.authService.login(user)
    }

}