import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { throwError } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService) {}


    async CreateUser(data: Prisma.UsersCreateInput) {
        try {
            const userExists = await this.prisma.users.findUnique({
                where: {
                    email: data.email
                }
            });
    

            if (userExists) {
                throw {
                    statusCode: 400,
                    message: 'Já existe um usuário com esse email',
                };
            }
            await this.prisma.users.create({ data });
            return {
                statusCode: 200,
                message: 'Usuário criado com sucesso',
            };
    
        } catch (error) {
           
            throw {
                statusCode: error.statusCode || 500,
                message: error.message || 'Não foi possível criar o usuário',
                originalError: error.originalError || error.message,
            };
        }
    }
        


   

    async DeleteUser(email: string) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    email: email
                }
            });
    
            if (!user) {
                throw{
                    statusCode:400, message: 'usuario não encontrado'
                }
            }

            await this.prisma.users.delete({
                where: {
                    email: email
                }

            
             });

             return{
                statusCode:200,
                message:'Usuario deletado com sucesso'
             }
        } catch (error) {
            throw{
                statusCode: 500, 
                message: 'Não foi possível deletar o usuario', 
                originalError: error.message 

            }
           
        }
    }
    async ValidationLogin(email: string, password: string) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    email: email,
                    password: password
                }
            });
    
            if (!user) {
                throw { statusCode: 404, message: 'Usuário não encontrado' };
            } else {
                return user;
            }
    
        } catch (error) {
            throw { 
                statusCode: 500, 
                message: 'Não foi possível achar o usuário', 
                originalError: error.message 
            };
        }
    }
}