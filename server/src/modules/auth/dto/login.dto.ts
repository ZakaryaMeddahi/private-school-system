import { IsEmail, Length } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  email: string;

  @Length(8, 20)
  password: string;
}
