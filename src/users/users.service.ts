import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class UsersService {
  constructor(private readonly analyticsService: AnalyticsService) {}

  findAll() {
    this.analyticsService.captureEvent('users_list_viewed', 'anonymous_user');
    return `This action returns all users`;
  }

  findOne(id: number) {
    this.analyticsService.captureEvent('user_details_viewed', 'anonymous_user', { userId: id });
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    this.analyticsService.captureEvent('user_deleted', 'anonymous_user', { userId: id });
    return `This action removes a #${id} user`;
  }
}