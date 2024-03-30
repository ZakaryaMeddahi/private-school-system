import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}