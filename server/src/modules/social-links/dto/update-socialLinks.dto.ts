import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialLinksDto } from './create-socialLinks.dto';

export class UpdateSocialLinksDto extends PartialType(CreateSocialLinksDto) {}
