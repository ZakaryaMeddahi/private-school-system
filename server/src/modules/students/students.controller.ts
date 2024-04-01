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
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtPayload } from 'src/shared/types';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('api/v1/students')
@UseGuards(AuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('account/me')
  async myAccount(@AuthUser() user: JwtPayload) {
    const { sub: id } = user;
    try {
      const user = await this.studentsService.findByUserId(id);
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Something went wrong in the server',
        error.status || 500,
      );
    }
  }

  // TODO: Add update account endpoint

  @Get()
  async getStudents() {
    try {
      const students = await this.studentsService.findAll();
      return { status: 'success', data: students };
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
      const student = await this.studentsService.findOne(id)
      if(!student) throw new NotFoundException('Student not found')
      return { status: 'success', data: student }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async removeStudent(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.studentsService.remove(id)
      return { status: 'success', message: 'Student removed successfully' }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
