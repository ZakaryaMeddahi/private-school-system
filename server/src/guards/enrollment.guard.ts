import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EnrollmentsService } from 'src/modules/enrollments/enrollments.service';
import { Role } from 'src/shared/enums';

@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { sub: id, role } = request.user;
    const { courseId } = request.params;

    if (role === Role.ADMIN || role === Role.TEACHER) return true;

    return await this.enrollmentsService.isEnrolled(id, courseId);
  }
}
