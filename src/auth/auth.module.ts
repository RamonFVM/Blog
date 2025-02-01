import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';  // Importando o UserModule

@Module({
  imports: [UserModule],  // Importando o UserModule
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}