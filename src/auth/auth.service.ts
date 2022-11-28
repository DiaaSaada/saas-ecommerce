import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthService
{

    constructor(private prisma : PrismaService){

    }
    
    signin() {
        throw new Error("signin Method not implemented.");
    }
    signup() {
        throw new Error("signup Method not implemented.");
    }

}