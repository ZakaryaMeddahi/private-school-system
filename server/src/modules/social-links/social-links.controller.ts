import {
  Body,
  Controller,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSocialLinksDto } from './dto/create-socialLinks.dto';
import { SocialLinksService } from './social-links.service';
import { UpdateSocialLinksDto } from './dto/update-socialLinks.dto';

@Controller('api/v1/social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  // @Post()
  // async createSocialLinks(@Body() socialLinksData: CreateSocialLinksDto) {
  //   try {
  //     // TODO: extract user id from user and pass it to the service
  //     const newSocialLinks = await this.socialLinksService.create(socialLinksData);

  //     return {
  //       status: 'success',
  //       message: 'Social links created successfully',
  //       data: newSocialLinks,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpException('Cannot create social links', 500);
  //   }
  // }

  @Patch(':id')
  async updateSocialLinks(
    @Param('id') id: number,
    @Body() socialLinksData: UpdateSocialLinksDto,
  ) {
    try {
      const updatedSocialLinks = await this.socialLinksService.update(
        id,
        socialLinksData,
      );

      return {
        status: 'success',
        message: 'Social links updated successfully',
        data: updatedSocialLinks,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update social links', 500);
    }
  }
}
