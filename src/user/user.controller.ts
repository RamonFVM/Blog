import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  async CreateUser(@Body() body:{name:string, email:string, password:string}){

    return await this.userService.CreateUser(body)
     
  }
 
  @Delete()
  async deleteUser(@Body() body: { name: string }) {
    return await this.userService.DeleteUser(body.name);  
  }

 
  @Post('validar')
  async ValidateUser(@Body() body: { name: string, password: string }) {
    return await this.userService.ValidationLogin(body.name, body.password); 
  }


  @Put()
  async UpdateUser(@Body() body: { name: string, password: string }) {
    return await this.userService.UpdateUser(body.name, body.password); 
  }
}