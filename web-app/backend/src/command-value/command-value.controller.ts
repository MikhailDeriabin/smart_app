import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
// import {CommandValueService} from "./command-value.service.ts";
import {SensorValue} from "../sensor-value/entities/sensor-value.entity";
import {CreateSensorValueDto} from "../sensor-value/dto/create-sensor-value.dto";
import {CreateCommandValueDto} from "./dto/create-command-value.dto";
import {CommandValue} from "./entities/command-value.entity";
import {UpdateDeviceDto} from "../device/dto/update-device.dto";
import {UpdateCommandValueDto} from "./dto/update-command-value.dto";
import {CommandValueService} from "./command-value.service";


@Controller('command-value')
export class CommandValueController {

    constructor(private readonly commandValueService: CommandValueService) {}


    @Post()
    @ApiOperation({ summary: 'Create a status value' })
    @ApiCreatedResponse({
        description: ' a status value created ',
        type: CommandValue
    })
    async create(@Body() createCommandValueDto: CreateCommandValueDto):Promise<CommandValue> {
        return await this.commandValueService.create(createCommandValueDto);
    }


    @Get()
    @ApiOperation({ summary: 'Get all CommandValues' })
    @ApiResponse({ status: 200, description: 'Ok' })
    async findAll() {
        return await this.commandValueService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a command value' })
    @ApiResponse({ status: 200, description: 'Ok' })
    @ApiResponse({ status: 404, description: 'could not find matching CommandValue' })
    async findOne(@Param('id') id: string) {
        return await this.commandValueService.findOne(id);
    }


    @Patch(':id')
    @ApiOperation({summary: 'Updated'})
    @ApiResponse({status:200, description: 'Ok'})
    @ApiResponse({status:404, description: 'could not find matching CommandValue '})
    async update(@Param('id') id: string, @Body() updateStatusValueDto: UpdateCommandValueDto) {
        return await this.commandValueService.update(id, updateStatusValueDto);
    }



    @Delete(':id')
    @ApiOperation({ summary: 'Delete a CommandValue ' })
    @ApiResponse({ status: 200, description: 'Deleted' })
    @ApiResponse({ status: 404, description: 'could not find matching CommandValue ' })
    async remove(@Param('id') id: string) {
        return await this.commandValueService.remove(id);
    }
}
