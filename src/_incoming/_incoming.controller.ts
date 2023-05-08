import { Controller, Get, Param, Patch, Post, Body } from '@nestjs/common';
import { IncomingService } from './_incoming.service';

@Controller('api/incomings')
export class IncomingController {
  constructor(private readonly incomingService: IncomingService) {}

  @Get()
  getAllAnimals(): Promise<any[]> {
    return this.incomingService.getAllAnimals();
  }

  @Get(':animalId')
  getOneAnimal(@Param() animalId: number) {
    return this.incomingService.getOneAnimal(animalId);
  }

  @Post()
  incomingAnimal(@Body() newAnimal: any) {
    return this.incomingService.incomingAnimal(newAnimal);
  }

  @Patch(':animalId')
  departureAnimal(@Param() animalId: number) {
    return this.incomingService.departureAnimal(animalId);
  }
}
