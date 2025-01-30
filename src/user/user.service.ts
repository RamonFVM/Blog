import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.prisma.users.findUnique({ where: { email } });
    return user ? true : false;
  }

  async checkNameExists(name: string): Promise<boolean> {
    const user = await this.prisma.users.findUnique({ where: { name } });
    return user ? true : false;
  }

  async CreateUser(data: Prisma.UsersCreateInput) {
    try {
      const emailExists = await this.checkEmailExists(data.email);
      if (emailExists) {
        return { statusCode: 400, message: 'Já existe um usuário com esse e-mail' }; 
      }

      const nameExists = await this.checkNameExists(data.name);
      if (nameExists) {
        return { statusCode: 400, message: 'Já existe um usuário com esse nome' };
      }

      const user = await this.prisma.users.create({ data });

      return {
        statusCode: 201,
        message: 'Usuário criado com sucesso',
        user,
      };
    } catch (error) {
      return { statusCode: 500, message: 'Erro ao criar o usuário' }; 
    }
  }
  async DeleteUser(name: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { name },
      });

      if (!user) {
        throw { message: 'Usuário não encontrado', statusCode: 404 }; 
      }

      await this.prisma.users.delete({
        where: { name },
      });

      return {
        statusCode: 200,
        message: 'Usuário deletado com sucesso',
      };
    } catch (error) {
      throw error || 'Não foi possível deletar o usuário';
    }
  }

  async ValidationLogin(name: string, password: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { name },
      });

      if (!user || user.password !== password) {
        throw { message: 'Usuário ou senha incorretos', statusCode: 404 }; 
      }

      return user;
    } catch (error) {
      throw error || 'Erro ao autenticar o usuário';
    }
  }

  async UpdateUser(name: string, newPassword: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { name },
      });

      if (!user) {
        throw { message: 'Usuário não encontrado', statusCode: 404 };
      }

      const updatedUser = await this.prisma.users.update({
        where: { name },
        data: { password: newPassword },
      });

      return {
        statusCode: 200,
        message: 'Usuário atualizado com sucesso',
        updatedUser,
      };
    } catch (error) {
      throw error || 'Não foi possível atualizar o usuário';
    }
  }
}