import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserParams, RegisterUserParams } from '../utils/types';
import { JwtService } from '@nestjs/jwt';

let users = [];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  register(userData: RegisterUserParams) {
    const user = users.find((u) => u.email === userData.email);

    if (user) return null;

    const newUser = {
      id: users.length + 1,
      ...userData,
    };
    users = [...users, newUser];

    const access_token = this.jwtService.sign({
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    return { ...newUser, access_token };
  }

  login(userData: LoginUserParams) {
    const user = users.find(
      (u) => u.email === userData.email && u.password === userData.password,
    );

    if (!user) return null;

    const access_token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { ...user, access_token };
  }
}
