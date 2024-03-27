import { Injectable } from '@nestjs/common';
import { CreateTeacherParams, UpdateTeacherParams } from 'src/shared/types';

@Injectable()
export class TeachersService {
  findAll() {
    return `This action returns all teachers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  create(teacherData: CreateTeacherParams) {
    return 'This action adds a new teacher';
  }

  update(id: number, teacherData: UpdateTeacherParams) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
