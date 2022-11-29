import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, SignupDto } from "./dto";
import * as argon2 from "argon2";

@Injectable()
export class AuthService
{

    constructor(private prisma : PrismaService){

    }
    
    signin(dtq: LoginDto) {
        
    }

     async signup(dto: SignupDto) {
        

        // has password
        const hash = await argon2.hash(dto.password);

        
        const user = await this.prisma.user.create({
                    data: {email: dto.email, hash, firstName:  dto.firstName, lastName: dto.lastName}
        });
        return user;        
    }

}