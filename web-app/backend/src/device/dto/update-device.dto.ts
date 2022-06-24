import { CreateDeviceDto } from './create-device.dto';
import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";


export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {


    @ApiProperty({example:'off/on/50%', description: 'The device status' ,required:false})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    status?: string;
}
