import { Controller, Delete, Param, Patch } from '@nestjs/common';
import { IncomingService } from './_incoming.service';

@Controller('api/animal')
export class AnimalController {
  constructor(private readonly incomingService: IncomingService) {}

  @Patch(':animalId')
  reviveAnimal(@Param() animalId: number) {
    return this.incomingService.reviveAnimal(animalId);
  }

  @Delete(':animalId')
  dieAnimal(@Param() animalId: number) {
    return this.incomingService.dieAnimal(animalId);
  }
}
