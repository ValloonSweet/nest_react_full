import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/auth/dto/register.dto";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {

    }

    async all() : Promise<User[]> {
        return await this.userRepository.find();
    }

    async paginate(page: number = 1): Promise<any> {
        const take = 1;
        const [users, total] = await this.userRepository.findAndCount(
            {take, skip: (page - 1) * take, relations: {role: true}}
        );

        return {
            data: users.map(user => {
                const {password, ..._user} = user;
                return _user;
            }),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }

    async create(data): Promise<User> {
        return await this.userRepository.save(data);
    }

    async findOne(condition): Promise<User> {
        return await this.userRepository.findOne({where: condition});
    }

    async update(id: number, data): Promise<any> {
        return await this.userRepository.update(id, data);
    }

    async delete(id: number) {
        return await this.userRepository.delete({id});
    }
}
