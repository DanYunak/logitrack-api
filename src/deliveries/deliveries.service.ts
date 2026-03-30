import { Injectable, BadRequestException } from '@nestjs/common';
// import { CreateDeliveryDto } from './dto/create-delivery.dto';
// import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  // create(createDeliveryDto: CreateDeliveryDto) {
  //   return 'This action adds a new delivery';
  // }

  findAll() {
    return `This action returns all deliveries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} delivery`;
  }

  // update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
  //   return `This action updates a #${id} delivery`;
  // }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }

  calculateDeliveryCost(distance: number, weight: number): number {
    if (distance < 0) throw new BadRequestException('Distance cannot be negative');
    if (weight < 0) throw new BadRequestException('Weight cannot be negative');

    let totalCost = 50 + (distance * 10);

    if (weight > 5) totalCost += (weight - 5) * 5;

    return totalCost;
  }
}