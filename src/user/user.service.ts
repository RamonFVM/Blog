import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService) {}


    async CreateUser(data: Prisma.UsersCreateInput){

        return this.prisma.users.create({data})


    }
}
