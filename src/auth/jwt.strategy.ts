import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { UserEntity } from 'src/user/model/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }
  async validate({ email }: Pick<UserEntity, 'email'>) {
    return email;
  }

  private static extractJWT(req: RequestType): string | null {
    if (!req.headers.cookie) {
      return null;
    }
    if (!req.headers.cookie.includes('token__acc')) {
      return null;
    }
    const index = req.headers.cookie.indexOf('=');
    return req.headers.cookie.slice(index + 1);
  }
}
