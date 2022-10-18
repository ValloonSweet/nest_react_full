import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/auth/dto/register.dto";
import { Repository } from "typeorm";
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

    async create(data): Promise<User> {
        return await this.userRepository.save(data);
    }

    async findOne(condition): Promise<User> {
        return await this.userRepository.findOne({where: condition});
    }
}
