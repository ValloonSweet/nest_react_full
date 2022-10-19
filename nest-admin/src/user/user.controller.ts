import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './dto/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {

    }

    @Get()
    async all(@Query('page') page: number = 1) : Promise<User[]> {
        return await this.userService.paginate(page);
    }

    @Post()
    async create(@Body() body): Promise<User> {
        const password = await bcrypt.hash(body.password, 12);
        const {role_id, ...data} = body;
        return await this.userService.create({
            ...data,
            password,
            role: {id: role_id}
        });
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.userService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UserUpdateDto
    ) {
        const {role_id, ...data} = body;
        await this.userService.update(id, {
            ...data,
            role: {id: role_id}
        });
        return await this.userService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
