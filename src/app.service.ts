import { Injectable } from '@nestjs/common';
import { serverTime } from './loggin.interceptor';

@Injectable()
export class AppService {
  getServerTime() {
    return serverTime;
  }
}
