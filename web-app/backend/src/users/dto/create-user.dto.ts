import { ApiProperty} from "@nestjs/swagger";
import {IsString, IsEmail, isBoolean, IsBoolean} from "class-validator";


export class CreateUserDto {
    @ApiProperty({example: 'John228@gmail.com', description: 'Username'})
    @IsEmail()
    username    : string;
    @ApiProperty({example: '1241413edw34', description: 'Password'})
    @IsString()
    password: string;
    @IsBoolean()
    isValid?: boolean;
}


