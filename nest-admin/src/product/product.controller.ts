import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDto } from './models/create-product.dto';
import { ProductUpdateDto } from './models/update-product.dto';
import { ProductService } from './product.service';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {

    }

    @Get()
    async all(
        @Query('page') page: number = 1,
        @Query('take') take: number = 15
    ) {
        return await this.productService.paginate(page);
    }

    @Post()
    async create(@Body() body: ProductCreateDto) {
        return await this.productService.create(body);
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return await this.productService.findOne({id})
    }

    @Put('id')
    async update(
        @Param('id') id: number,
        @Body() body: ProductUpdateDto
    ) {
        return await this.productService.update(id, body);
    }

    @Delete('id')
    async delete(@Param('id') id: number) {
        return await this.productService.delete(id);
    }
}
