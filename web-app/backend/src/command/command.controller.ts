import {Body, Controller, Post} from '@nestjs/common';
import {CommandService} from "./command.service";

@Controller('command')
export class CommandController {
    constructor(private readonly commandService: CommandService) {}

    @Post()
    async create(@Body() commandObject: JSON): Promise<void> {
        await this.commandService.create(commandObject);
    }
}
