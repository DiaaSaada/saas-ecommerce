import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserController } from './user.controller';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [JwtStrategy]
})
export class UserModule {}
