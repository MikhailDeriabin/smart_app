import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateRoomDto {

    @ApiProperty({example:'Kitchen', description: 'The room name', required : true})
    @IsString()
    @IsNotEmpty()
    roomName?: string;

}
