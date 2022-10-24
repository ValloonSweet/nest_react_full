import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {

    }

    @HasPermission('view_users')
    @Get()
    async all(@Query('page') page: number = 1) : Promise<User[]> {
        return await this.userService.paginate(page, ['role']);
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

    @Put('info')
    async updateInfo(
        @Body() body: UserUpdateDto,
        @Req() request: Request
    ) {
        const id = await this.authService.userId(request);
        await this.userService.update(id, body);
        return await this.userService.findOne({id});
    }

    @Put('password')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string
    ) {

        if(password !== password_confirm) {
            throw new BadRequestException('Password do not match!');
        }

        const hashed = await bcrypt.hash(password, 12);
        const id = await this.authService.userId(request);
        await this.userService.update(id, {password: hashed});
        return await this.userService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
