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
        return await this.roleService.all([]);
    }

    @Post()
    async create(
        @Body('name') name: string,
        @Body('permissions') ids: number[]
    ): Promise<Role> {
        try {
            return await this.roleService.create({
                name,
                permissions: ids.map(id => {id})
             });
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY')
                throw new BadRequestException('This role already exists');
        }
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.roleService.findOne({id}, ['permissions']);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('name') name: string,
        @Body('permissions') ids: number[]
    ) {
        await this.roleService.update(id, {name,});
        const role = await this.roleService.findOne({id});

        return await this.roleService.create({
            ...role,
            permissions: ids.map(id => {id})
        })
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.roleService.delete(id);
    }
}
