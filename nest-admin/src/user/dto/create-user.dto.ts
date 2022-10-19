import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/role/role.entity";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    public first_name: string;

    @IsString()
    public last_name: string;

    @IsString()
    @IsNotEmpty()
    public password: string;

    public role: any
}
