import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { UserEntity } from 'src/user/model/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto: AuthDto, response: Response): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(dto.email);
    const isCorrectPassword = await compare(dto.password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('wrong password');
    }
    const email = dto.email;
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);
    response.cookie('token__acc', token);
    return user;
  }
}
