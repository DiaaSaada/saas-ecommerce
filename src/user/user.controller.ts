import { Body, Controller, Get, Post, Req, UseGuards, Put } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Request } from "express";
import {GetUser}  from './../auth/decorator/get-user.decorator'
import { EditUser } from "./edit-user.dto";
import { UserService } from "./user.service";


@Controller('users')
export class UserController{
    constructor(private userService: UserService){}


    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    profile(@GetUser() user: User){ 
        return user ;
    }


    
    @UseGuards(AuthGuard('jwt'))
    @Put('edit')
    update(@GetUser() user: User, @Body() dto: EditUser){ 
        return this.userService.updateUser( user.id ,  dto ) ;
    }


    
}