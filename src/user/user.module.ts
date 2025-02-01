import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';  // Importando o DatabaseModule para o PrismaService

@Module({
  imports: [DatabaseModule],  // Importando o DatabaseModule
  providers: [UserService],
  exports: [UserService],  // Exportando o UserService para ser usado em outros módulos
})
export class UserModule {}