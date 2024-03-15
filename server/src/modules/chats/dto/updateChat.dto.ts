import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './createChat.dto';

export class UpdateChatDto extends PartialType(CreateChatDto) {}
