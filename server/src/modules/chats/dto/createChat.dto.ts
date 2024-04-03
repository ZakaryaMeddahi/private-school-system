import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatDto {
  @IsNotEmpty()
  name: string;
}