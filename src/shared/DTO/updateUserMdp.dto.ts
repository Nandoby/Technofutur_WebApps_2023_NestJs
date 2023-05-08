import { IsDefined, IsStrongPassword } from 'class-validator';

export class UpdateUserMdp {
  @IsDefined()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  mdp: string;
}
