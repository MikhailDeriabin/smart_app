import {Body, Controller, Post} from '@nestjs/common';
import {CommandService} from "./command.service";

@Controller('command')
export class CommandController {
    constructor(private readonly commandService: CommandService) {}

    @Post()
    async create(@Body() commandObject: any): Promise<object | void> {
        return await this.commandService.create(commandObject);
    }
}
