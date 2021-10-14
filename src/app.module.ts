import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AuthMiddleware } from './middlewares/auth.middleware'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user.module'
import { AuthModule } from './modules/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule],
  controllers: 
  [
    AppController
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
          .forRoutes('user')
  }
}
