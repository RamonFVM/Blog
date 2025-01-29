import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  async CreateUser(@Body() body:{name:string, email:string, password:string}){

    return await this.userService.CreateUser(body)
     
  }

  @Delete()
  async deleteUser(@Body() body: { email: string }) {
    return await this.userService.DeleteUser(body.email); 
  }

  @Post('validar')

   async ValidateUser(@Body() body:{email:string, password:string }){
    return await this.userService.ValidationLogin(body.email, body.password)
  }
}