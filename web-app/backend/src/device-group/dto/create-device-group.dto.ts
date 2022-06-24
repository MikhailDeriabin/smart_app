import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty,IsString} from "class-validator";

export class CreateDeviceGroupDto {
    @ApiProperty({example:'Lamps', description: 'The device name'})
    @IsString()
    @IsNotEmpty()
    deviceGroupName: string;
}
