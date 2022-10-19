import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    public name: string;
}
