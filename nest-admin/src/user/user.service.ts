import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/auth/dto/register.dto";
import { AbstractService } from "src/common/abstract.service";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.entity";

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    async paginate(page: number = 1, relations = []): Promise<any> {
        const {data, meta} = await super.paginate(page, relations);

        return {
            data: data.map(user => {
                const {password, ..._user} = user;
                return _user;
            }),
            meta
        }
    }


}
