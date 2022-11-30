import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import {GetUser}  from './../auth/decorator/get-user.decorator'


@Controller('users')
export class UserController{
    constructor(){}


    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    signup(@GetUser() user){ 
        return user ;
    }


    
}