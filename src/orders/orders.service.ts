import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class OrdersService {
  constructor(private readonly analyticsService: AnalyticsService) {}

  findAll() {
    this.analyticsService.captureEvent('orders_list_viewed', 'anonymous_user');
    return `This action returns all orders`;
  }

  findOne(id: number) {
    this.analyticsService.captureEvent('order_details_viewed', 'anonymous_user', { orderId: id });
    return `This action returns a #${id} order`;
  }

  remove(id: number) {
    this.analyticsService.captureEvent('order_deleted', 'anonymous_user', { orderId: id });
    return `This action removes a #${id} order`;
  }
}