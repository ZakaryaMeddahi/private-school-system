import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialLinks } from 'src/shared/entities/socialLinks.entity';
import {
  CreateSocialLinksParams,
  UpdateSocialLinksParams,
} from 'src/shared/types';
import { Repository } from 'typeorm';

@Injectable()
export class SocialLinksService {
  constructor(
    @InjectRepository(SocialLinks)
    private readonly socialLinksRepository: Repository<SocialLinks>,
  ) {}

  async findByUserId(userId: number) {
    try {
      const socialLinks = await this.socialLinksRepository.findOne({
        where: { user: { id: userId } },
      });

      if (!socialLinks) throw new NotFoundException('Social links not found');

      return socialLinks;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get social links', 500);
    }
  }

  async findOne(id: number) {
    try {
      const socialLinks = await this.socialLinksRepository.findOne({
        where: { id },
      });

      if (!socialLinks) throw new NotFoundException('Social links not found');

      return socialLinks;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get social links', 500);
    }
  }

  async create(id: number, socialLinksData: CreateSocialLinksParams) {
    try {
      const newSocialLinks = this.socialLinksRepository.create({
        ...socialLinksData,
        user: { id },
      });

      const socialLinksEntity =
        await this.socialLinksRepository.save(newSocialLinks);

      return socialLinksEntity;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create social links', 500);
    }
  }

  async update(id: number, socialLinksData: UpdateSocialLinksParams) {
    try {
      const socialLinks = await this.socialLinksRepository.findOne({
        where: { id },
      });

      if (!socialLinks) throw new NotFoundException('Social links not found');

      const updatedSocialLinks = await this.socialLinksRepository.save({
        ...socialLinks,
        ...socialLinksData,
      });

      return updatedSocialLinks;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update social links', 500);
    }
  }
}
