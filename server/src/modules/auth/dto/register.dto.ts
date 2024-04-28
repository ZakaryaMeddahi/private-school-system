import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @MinLength(8)
  @MaxLength(32)
  password: string;
}
