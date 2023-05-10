import { IsDefined } from 'class-validator';
import { UserDonation } from '../donations/userDonation.dto';

export class User {
  @IsDefined()
  id: number;

  @IsDefined()
  login: string;

  @IsDefined()
  mdp: string;

  @IsDefined()
  active: boolean;

  /**
   * Part Relational Entities
   */
  donation: UserDonation[];
}
