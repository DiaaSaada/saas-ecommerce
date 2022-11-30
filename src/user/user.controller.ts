import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";


@Controller('users')
export class UserController{
    constructor(){}


    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    signup(@Req() req: Request){ 
        return req.body ;
    }


    
}