import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateManufacturerDto {
    @ApiProperty({example:'Lenovo', description: 'The manufacturer name'})
    @IsString()
    @IsNotEmpty()
    manufacturer: string;
}
