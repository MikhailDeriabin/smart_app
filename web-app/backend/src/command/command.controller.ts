import {Body, Controller, Post} from '@nestjs/common';
import {CommandService} from "./command.service";
import {ApiCreatedResponse, ApiOperation} from "@nestjs/swagger";
import { Command } from "./command";

@Controller('command')
export class CommandController {
    constructor(private readonly commandService: CommandService) {}

    @Post()
    @ApiOperation({ summary: 'Send a command to the esp device' })
    @ApiCreatedResponse({
        description: 'Command has been sent successfully',
        type: Command
    })
    async create(@Body() commandObject: any): Promise<object | void> {
        return await this.commandService.create(commandObject);
    }
}
