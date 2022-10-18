import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    public first_name: string;

    @IsString()
    public last_name: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public password: string;

    @IsNotEmpty()
    public password_confirm: string;
}
