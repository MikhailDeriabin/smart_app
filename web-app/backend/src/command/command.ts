import {ApiProperty} from "@nestjs/swagger";

export class Command {
    @ApiProperty()
    boardId: number;

    @ApiProperty()
    deviceId: number;

    @ApiProperty()
    command: number;

    @ApiProperty()
    params: object;
}