import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
             private readonly jwtService: JwtService,
  ) {}


  async  validateLogin(name: string, password: string){
 
    const user = await this.userService.findOneByName(name);

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const payload = { sub: user.id, username: user.name };

    return {access_token: await this.jwtService.signAsync(payload)}

  
  }
}