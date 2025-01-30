import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}
    async CreateUser(data: Prisma.UsersCreateInput) {
        try {
           
            const userExists = await this.prisma.users.findUnique({
                where: {
                    name: data.name,
                },
            });
    
            const emailExists = await this.prisma.users.findUnique({
                where: {
                    email: data.email,
                },
            });
    
          
            if (emailExists) {
                throw {
                    statusCode: 400,
                    message: 'Já existe um usuário com esse e-mail',
                };
            }
    
          
            if (userExists) {
                throw {
                    statusCode: 400,
                    message: 'Já existe um usuário com esse nome',
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
    async DeleteUser(name: string) {
        try {
         
      
        
          const user = await this.prisma.users.findUnique({
            where: {
              name: name, 
            },
          });
      
          if (!user) {
            
            throw {
              statusCode: 404, 
              message: 'Usuário não encontrado',
            };
          }
      
          await this.prisma.users.delete({
            where: {
              name: name,
            },
          });
      
          return {
            statusCode: 200,
            message: 'Usuário deletado com sucesso',
          };
        } catch (error) {
          throw {
            statusCode: error.statusCode || 500,
            message: error.message || 'Não foi possível deletar o usuário',
            originalError: error.originalError || error.message,
          };
        }
      }

      
    async ValidationLogin(name: string, password: string) { 
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    name: name, 
                    password: password
                }
            });

            if (!user) {
                throw { 
                    statusCode: 404, message: 'Usuário não encontrado' };
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
    
    async UpdateUser(name: string, newPassword: string) { 
        try {
    
            const user = await this.prisma.users.findUnique({
                where: {
                    name: name,  
                },
            });
    
            if (!user) {
                throw {
                    statusCode: 404,
                    message: 'Usuário não encontrado',
                };
            }
    
            const updatedUser = await this.prisma.users.update({
                where: {
                    name: name,  
                },
                data: {
                    password: newPassword, 
                },
            });
    
            return {
                statusCode: 200,
                message: 'Usuário atualizado com sucesso',
                updatedUser,
            };
    
        } catch (error) {
    
            throw {
                statusCode: error.statusCode || 500,
                message: error.message || 'Não foi possível atualizar o usuário',
                originalError: error.originalError || error.message,
            };
        }
    }
}