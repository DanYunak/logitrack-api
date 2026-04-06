import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  // @Post()
  // create(@Body() createDeliveryDto: CreateDeliveryDto) {
  //   return this.deliveriesService.create(createDeliveryDto);
  // }

  @Post('calculate')
  async calculateCost(@Body() body: { distance: number; weight: number }) {
    const cost = await this.deliveriesService.calculateDeliveryCost(body.distance, body.weight);
    return { cost };
  }

  @Get()
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
  //   return this.deliveriesService.update(+id, updateDeliveryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }
}
