import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {
    }

    @Get()
    async all(
        @Query('page') page: number = 1
    ) {
        return await this.orderService.paginate(page);
    }
}
