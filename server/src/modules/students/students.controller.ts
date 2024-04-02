import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  NotFoundException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtPayload, UpdateStudentParams } from 'src/shared/types';
import { AdminGuard } from 'src/guards/admin.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/shared/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/students')
@UseGuards(AuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('account/me')
  async myAccount(@AuthUser() user: JwtPayload) {
    const { sub: id } = user;
    try {
      const user = await this.studentsService.findByUserId(id);
      return {
        status: 'success',
        message: 'Account data loaded successfully',
        data: user,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Something went wrong in the server',
        error.status || 500,
      );
    }
  }

  // TODO: Handle profile image file upload
  @Patch('account/me')
  @UseInterceptors(FileInterceptor('image'))
  async updateMyAccount(
    @AuthUser() user: JwtPayload,
    @Body() AccountData: UpdateStudentParams,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const { sub: id } = user;
    try {
      const updatedUser = await this.studentsService.updateAccount(
        id,
        AccountData,
        image,
      );
      return {
        status: 'success',
        message: 'Account data updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Something went wrong in the server',
        error.status || 500,
      );
    }
  }

  @Patch('account/me/profile-picture')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfilePicture(
    @AuthUser() user: JwtPayload,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const { sub: id } = user;
    try {
      const updatedUser = await this.studentsService.updateProfilePicture(id, image);
      return {
        status: 'success',
        message: 'Profile picture updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Something went wrong in the server',
        error.status || 500,
      );
    }
  }

  @Get()
  async getStudents() {
    try {
      const students = await this.studentsService.findAll();
      return {
        status: 'success',
        message: 'Students loaded successfully',
        data: students,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  @Get(':id')
  async getStudent(@Param('id', ParseIntPipe) id: number) {
    try {
      const student = await this.studentsService.findOne(id);
      return {
        status: 'success',
        message: 'Student loaded successfully',
        data: student,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async removeStudent(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.studentsService.remove(id);
      return { status: 'success', message: 'Student removed successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
