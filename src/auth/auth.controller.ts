import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signin(@Body() body: { name: string; password: string }) {
    const user = await this.authService.validateLogin(body.name, body.password);
    return {
      statusCode: 200,
      message: 'Login bem-sucedido',
      user,
    };
  }
}