import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;
}