import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './createRoom.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
