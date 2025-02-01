import { Body, Controller, Delete, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UnauthorizedException } from '@nestjs/common';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async CreateUser(@Body() body: { name: string; email: string; password: string }) {
    try {
      const result = await this.userService.CreateUser(body);
      
      if (result.statusCode === 201) {
        return result; 
      } else {
        
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
     
      throw new HttpException(
        error.message || 'Erro ao cadastrar o usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('check-email')
  async checkEmail(@Body() body: { email: string }) {
    const exists = await this.userService.checkEmailExists(body.email);
    return { exists };
  }

  @Post('check-name')
  async checkName(@Body() body: { name: string }) {
    const exists = await this.userService.checkNameExists(body.name);
    return { exists };
  }

  @Delete()
  async deleteUser(@Body() body: { name: string }) {
    return await this.userService.DeleteUser(body.name);  
  }

  @Put()
  async UpdateUser(@Body() body: { name: string, password: string }) {
    return await this.userService.UpdateUser(body.name, body.password); 
  }
}