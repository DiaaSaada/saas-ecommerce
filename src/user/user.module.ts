import { Module } from '@nestjs/common';
import { JwtStrategy } from './../auth/strategy/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [JwtStrategy, UserService]
})
export class UserModule {}
