import { RoomStatus } from "src/shared/enums";

export class CreateRoomDto {
  name: string;
  slug: string;
  status: RoomStatus;
}