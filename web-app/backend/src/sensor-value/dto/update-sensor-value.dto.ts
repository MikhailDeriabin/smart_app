import { PartialType } from '@nestjs/mapped-types';
// import { CreateDeviceGroupDto } from './create-device-group.dto';
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsString} from "class-validator";
import {CreateSensorValueDto} from "./create-sensor-value.dto";



export class UpdateSensorValueDto extends PartialType(CreateSensorValueDto) {


    // @IsArray()
    // @IsNotEmpty()
    // /*@ApiProperty({ type: [Device],required:false })
    // devices?: Device[];  */
    // @ApiProperty({ type: [String],required:false })
    // devices?: String[];

}
