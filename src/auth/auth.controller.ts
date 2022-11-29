import { Bind, Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { LoginDto, SignupDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService:  AuthService){}


    @Post('signup')
    signup(@Body() dto: SignupDto){ // using express {@Req() req: Request}
        return this.authService.signup(dto)
    }


    @Post('signin')
    signin(@Body() dto: LoginDto){ // using nestJS
        return dto
       return this.authService.signin( dto)
    }
}