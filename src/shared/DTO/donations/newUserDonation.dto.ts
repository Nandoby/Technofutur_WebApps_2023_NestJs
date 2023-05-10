import { IsDefined } from 'class-validator';
import { User } from '../users/user.dto';

export class NewUserDonation {
  @IsDefined()
  type: string;

  @IsDefined()
  qty_in_kg: number;

  @IsDefined()
  expiration_date: string;

  /**
   * Part Relational Entities
   */
  user: User;
}
