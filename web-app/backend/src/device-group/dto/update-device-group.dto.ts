import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceGroupDto } from './create-device-group.dto';
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsString} from "class-validator";



export class UpdateDeviceGroupDto extends PartialType(CreateDeviceGroupDto) {

    @IsArray()
    @IsNotEmpty()
    /*@ApiProperty({ type: [Device],required:false })
    devices?: Device[];  */
    @ApiProperty({ type: [String],required:false })
    devices?: String[];

}
