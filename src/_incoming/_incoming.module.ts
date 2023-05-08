import { Module } from '@nestjs/common';
import { IncomingController } from './_incoming.controller';
import { IncomingService } from './_incoming.service';
import { SpecieController } from './_specie.controller';
import { VaccineAnimalController } from './_vaccine-animal.controller';

@Module({
  controllers: [IncomingController, SpecieController, VaccineAnimalController],
  providers: [IncomingService],
})
export class IncomingModule {}
