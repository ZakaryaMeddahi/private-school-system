import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWT_AUTH } from 'src/config/swagger.config';

@ApiTags('Users')
@ApiBearerAuth(JWT_AUTH)
@Controller('api/v1/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
