import { User } from '../users/user.dto';

export class UserDonation {
  id: number;
  type: string;
  qty_in_kg: number;
  expiration_date: string;
  user: User;
}
