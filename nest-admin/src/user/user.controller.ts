import { Controller, Get } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';

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

}
