import { Controller, Get, Param } from '@nestjs/common';
import { IncomingService } from './_incoming.service';

@Controller('api/species')
export class SpecieController {
  constructor(private readonly incomingService: IncomingService) {}

  @Get(':specie')
  getAllBySpecie(@Param('specie') specie: string) {
    return this.incomingService.getAllBySpecie(specie);
  }
}
