import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Request } from "express";
import {GetUser}  from './../auth/decorator/get-user.decorator'


@Controller('users')
export class UserController{
    constructor(){}


    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    signup(@GetUser() user: User){ 
        return user ;
    }


    
}