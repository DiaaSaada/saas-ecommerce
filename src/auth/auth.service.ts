import { ForbiddenException, Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, SignupDto } from "./dto";
import * as argon2 from "argon2";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {

    }

    async signin(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (!user)
            throw new ForbiddenException('Incorect Creditntials');
        const pwMatch = await argon2.verify(user.hash, dto.password)
        if (!pwMatch)
            throw new ForbiddenException('Incorect Creditntials');

        delete user.hash
        return this.signJWT(user.id, user.email);
    }


    async signJWT(id: number, email: string): Promise<string> {
        const payload = {
            sub: id,
            email
        }
        return this.jwt.signAsync(payload, {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: '15m'
        });
    }

    async signup(dto: SignupDto) {


        // has password
        const hash = await argon2.hash(dto.password);


        const user = await this.prisma.user.create({
            data: { email: dto.email, hash, firstName: dto.firstName, lastName: dto.lastName }
        });
        return user;
    }

}