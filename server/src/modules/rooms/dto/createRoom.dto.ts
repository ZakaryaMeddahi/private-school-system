import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoomStatus } from 'src/shared/enums';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsEnum(RoomStatus, { message: 'Invalid room status' })
  status: RoomStatus;
}
