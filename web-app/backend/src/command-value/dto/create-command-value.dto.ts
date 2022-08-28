import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty,IsString} from "class-validator";
import {Column} from "typeorm";

export class CreateCommandValueDto {

    // @ApiProperty({example:'tempsensor', description: 'The sensor name'})
    @IsString()
    @IsNotEmpty()
    commandName: string;

    // @ApiProperty({example:'500c', description: 'The sensor value'})
    @IsString()
    @IsNotEmpty()
    commandValue: string;

}
