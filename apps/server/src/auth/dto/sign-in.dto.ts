import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
