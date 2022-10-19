import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import * as bcrypt from 'bcrypt';
import { CreateRoleDto } from './create-role.dto';

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) {

    }

    @Get()
    async all() {
        return await this.roleService.all();
    }

    @Post()
    async create(@Body('name') name: string): Promise<Role> {
        try {
            return await this.roleService.create({ name });
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY')
                throw new BadRequestException('This role already exists');
        }
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.roleService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: CreateRoleDto
    ) {
        await this.roleService.update(id, body);
        return await this.roleService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.roleService.delete(id);
    }
}
