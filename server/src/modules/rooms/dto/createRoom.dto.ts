import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoomStatus } from 'src/shared/enums';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsEnum(RoomStatus, { message: 'Invalid room status' })
  status: RoomStatus;
}
