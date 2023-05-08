import { Controller, Param, Patch } from '@nestjs/common';
import { IncomingService } from './_incoming.service';

@Controller('api/vaccine/animal')
export class VaccineAnimalController {
  constructor(private readonly incomingServe: IncomingService) {}

  @Patch(':animalId')
  vaccineAnimal(@Param() animalId: number) {
    return this.incomingServe.vaccineAnimal(animalId);
  }
}
