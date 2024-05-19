import { IsEmail, Length, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, {message: 'Invalid email format'})
  email: string;

  @MinLength(8)
  @MaxLength(32)
  password: string;
}
