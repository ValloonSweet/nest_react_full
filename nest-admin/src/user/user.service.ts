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

    async create(data: CreateUserDto): Promise<User> {
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
