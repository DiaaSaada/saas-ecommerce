import { Bind, Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
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


    @HttpCode(HttpStatus.OK) // nest js by default returns 201 for POST requests
    @Post('signin')
    signin(@Body() dto: LoginDto){ // using nestJS
        
       return this.authService.signin( dto)
    }
}