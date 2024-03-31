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
} from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

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
