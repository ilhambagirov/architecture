import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isEmail, IsNotEmpty } from "class-validator";

export class CreateUsersDto {
    @ApiProperty({
        description: "Name of User",
        required: true
    })
    @IsNotEmpty()
    public name: string

    @ApiProperty({
        description: "Lastname of User",
        required: true
    })
    @IsNotEmpty()
    public lastname: string

    @ApiProperty({
        description: "Patronymic of User",
        required: true
    })
    @IsNotEmpty()
    public patronymic: string

    @ApiProperty({
        description: "Email of User",
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    public email: string

    @ApiProperty({
        description: "Password of User",
        required: true
    })
    @IsNotEmpty()
    public password: string

}
