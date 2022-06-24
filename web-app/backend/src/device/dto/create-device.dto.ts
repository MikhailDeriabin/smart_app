import {ApiProperty,} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length,} from "class-validator";


export class CreateDeviceDto {

    @ApiProperty({example:'Philips-tv', description: 'The device name', required : false})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    deviceName?: string;

    @ApiProperty({example:'150', description: "The energy consumption(W)"})
    @IsNumber()
    @IsNotEmpty()
    deviceConsumption: number;

    @ApiProperty({example:'Philips', description: 'The device manufacturer'})
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
    deviceGroupName?: string;

    @ApiProperty({example:'Kitchen', description: 'The device room name',required:false})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    roomName?: string;
}
