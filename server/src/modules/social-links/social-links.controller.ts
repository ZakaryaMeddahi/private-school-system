import {
  Body,
  Controller,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateSocialLinksDto } from './dto/create-socialLinks.dto';
import { SocialLinksService } from './social-links.service';
import { UpdateSocialLinksDto } from './dto/update-socialLinks.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtPayload } from 'src/shared/types';

@Controller('api/v1/social-links')
@UseGuards(AuthGuard)
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
    @AuthUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() socialLinksData: UpdateSocialLinksDto,
  ) {
    try {
      const { sub: userId } = user;
      const updatedSocialLinks = await this.socialLinksService.update(
        userId,
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
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
