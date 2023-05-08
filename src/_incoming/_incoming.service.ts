import { Injectable } from '@nestjs/common';

@Injectable()
export class IncomingService {
  async getAllAnimals() {}

  async getOneAnimal(animalId: number) {}

  async getAllBySpecie(specie: string) {}

  async incomingAnimal(newAnimal: any) {}

  async departureAnimal(animalId: number) {}

  async vaccineAnimal(animalId: number) {}

  async dieAnimal(animalId: number) {}

  async reviveAnimal(animalId: number) {}
}
