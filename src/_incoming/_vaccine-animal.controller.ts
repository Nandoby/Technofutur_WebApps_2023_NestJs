import { Controller, Param, Patch } from '@nestjs/common';
import { IncomingService } from './_incoming.service';

@Controller('api/vaccine/animal')
export class VaccineAnimalController {
  constructor(private readonly incomingServe: IncomingService) {}

  @Patch(':animalId')
  vaccineAnimal(@Param('animalId') animalId: number): Promise<any> {
    return this.incomingServe.vaccineAnimal(animalId);
  }
}
