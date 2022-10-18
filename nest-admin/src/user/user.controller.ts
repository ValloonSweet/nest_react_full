import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
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
    async all() : Promise<User[]> {
        return await this.userService.all();
    }

    @Post()
    async create(@Body() body): Promise<User> {
        const password = await bcrypt.hash(body.password, 12);
        return await this.userService.create({
            email: body.email,
            first_name: body.first_name,
            last_name: body.last_name,
            password
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
        this.userService.update(id, body);
        return this.userService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
