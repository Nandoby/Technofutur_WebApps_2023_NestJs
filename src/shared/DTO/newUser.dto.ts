import {
  IsDefined,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class NewUser {
  id: number;

  @IsDefined()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  login: string;

  @IsDefined()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  mdp: string;

  active: boolean;
}
