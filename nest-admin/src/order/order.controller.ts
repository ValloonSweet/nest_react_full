import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import e, { Response } from 'express';
import { OrderService } from './order.service';
import { Parser } from 'json2csv';
import { Order } from './models/order.entity';
import { OrderItem } from './models/order-item.entity';

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
        return await this.orderService.paginate(page, ['order_items']);
    }

    @Post('export')
    async export(@Res() res: Response) {
        const parser = new Parser({
            fields: ['ID', 'Name', 'Product Title', 'Price', 'Quantity']
        });

        const orders = await this.orderService.all(['order_items']);
        const json = [];

        orders.forEach((o: Order) => {
            json.push({
                ID: o.id,
                Name: o.name,
                Email: o.email,
                'Product Title': '',
                Price: '',
                Quantity: ''
            })

            o.order_items.forEach((i: OrderItem) => {
                json.push({
                    ID: '',
                    Name: '',
                    Email: '',
                    'Product Title': i.product_title,
                    Price: i.price,
                    Quantity: i.quantity
                })
            })
        })

        const csv = parser.parse(json);
        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        return res.send(csv);
    }

    @Get('chart')
    async chart() {
        return await this.orderService.chart();
    }
}
