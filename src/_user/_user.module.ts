import { Module } from '@nestjs/common';
import { UserController } from './_user.controller';
import { UserService } from './_user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../shared/entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
