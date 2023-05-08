import { Module } from '@nestjs/common';
import { IncomingController } from './_incoming.controller';
import { IncomingService } from './_incoming.service';

@Module({
  controllers: [IncomingController],
  providers: [IncomingService],
})
export class IncomingModule {}
