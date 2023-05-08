import { Module } from '@nestjs/common';
import { UserModule } from './_user/_user.module';
import { IncomingModule } from './_incoming/_incoming.module';

@Module({
  imports: [UserModule, IncomingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
