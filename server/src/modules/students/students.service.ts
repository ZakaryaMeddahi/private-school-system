import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
