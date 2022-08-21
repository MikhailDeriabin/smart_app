import { CreateDeviceDto } from './create-device.dto';
import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";


/*export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {*/
export class UpdateDeviceDto {

    @ApiProperty({example:'off/on/50%', description: 'The device status' ,required:false})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({example:'Philips-tv', description: 'The device name', required : false})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    deviceName?: string;

    @ApiProperty({example:'1', description: "The platform id"})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    bordId?: number;

    @ApiProperty({example:'Lamps', description: 'The device group name',required:false})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    deviceGroup?: string;

    @ApiProperty({example:'Kitchen', description: 'The device room name',required:false})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    room?: string;


}
