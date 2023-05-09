import { IsDefined } from 'class-validator';

export class User {
  @IsDefined()
  id: number;

  @IsDefined()
  login: string;

  @IsDefined()
  mdp: string;

  @IsDefined()
  active: boolean;
}
