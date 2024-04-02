import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/shared/enums';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
