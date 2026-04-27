import { Controller, Get } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';

@Controller()
export class AppController {
  constructor() {}

  @Get('/debug-sentry')
  getError() {
    throw new Error('My first Sentry error!');
  }

  @Get('/debug-sentry-user')
  getUserError() {
    Sentry.setUser({
      id: 'user_2026',
      email: 'danylo.yunak@lpnu.ua',
      segment: 'premium_client'
    });

    throw new Error('Sentry User Context Error!');
  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
