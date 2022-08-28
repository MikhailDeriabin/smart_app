import {ApiProperty,} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length,} from "class-validator";


export class CreateDeviceDto {

    @ApiProperty({example:'Philips-tv', description: 'The device name', required : false})
    @IsString()
    @IsNotEmpty()
    deviceName: string;

    @ApiProperty({example:'150', description: "The energy consumption(W)"})
    @IsNumber()
    @IsNotEmpty()
    deviceConsumption: number;

    @ApiProperty({example:'1', description: "The platform id"})
    @IsNumber()
    @IsNotEmpty()
    bordId: number;

    @ApiProperty({example:'BEST_ALI', description: 'The device manufacturer'})
    @IsString()
    @IsNotEmpty()
    manufacturer: string;

    @ApiProperty({example:'TV', description: 'The device type'})
    @IsString()
    @IsNotEmpty()
    type: string;


    @ApiProperty({example:'Lamps', description: 'The device group name',required:false})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    deviceGroup?: string;

    @ApiProperty({example:'Kitchen', description: 'The device room name',required:false})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    room?: string;
}
