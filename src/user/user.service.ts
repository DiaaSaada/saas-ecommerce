import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { EditUser } from './edit-user.dto';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}


    async updateUser(userId: number, userDto: EditUser){


        let user: User = await this.prisma.user.update({
            where:{ id:  userId},
            data: userDto

        });
        delete user.hash
        return user
    }
}
