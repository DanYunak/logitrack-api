import { Injectable, BadRequestException } from '@nestjs/common';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class DeliveriesService {
  constructor(private readonly analyticsService: AnalyticsService) { }

  findAll() {
    this.analyticsService.captureEvent('deliveries_list_viewed', 'anonymous_user');
    return `This action returns all deliveries`;
  }

  findOne(id: number) {
    this.analyticsService.captureEvent('delivery_details_viewed', 'anonymous_user', { deliveryId: id });
    return `This action returns a #${id} delivery`;
  }

  remove(id: number) {
    this.analyticsService.captureEvent('delivery_deleted', 'anonymous_user', { deliveryId: id });
    return `This action removes a #${id} delivery`;
  }

  async calculateDeliveryCost(distance: number, weight: number): Promise<number> {
    if (distance < 0) throw new BadRequestException('Distance cannot be negative');
    if (weight < 0) throw new BadRequestException('Weight cannot be negative');

    let totalCost = 50 + (distance * 10);

    if (weight > 5) totalCost += (weight - 5) * 5;

    const isNewAlgorithm = await this.analyticsService.isFeatureEnabled(
      'use-new-pricing-algorithm',
      'anonymous_user'
    );

    if (isNewAlgorithm) {
      totalCost = totalCost * 1.2;
    }

    this.analyticsService.captureEvent('delivery_calculated', 'anonymous_user', {
      distance,
      weight,
      totalCost,
      newAlgorithmApplied: !!isNewAlgorithm,
    });

    return totalCost;
  }
}