import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

@Module({
  imports: [UsersModule, OrdersModule, DeliveriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
