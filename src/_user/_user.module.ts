import { Module } from '@nestjs/common';
import { UserController } from './_user.controller';
import { UserService } from './_user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [],
  exports: [],
})
export class UserModule {}
