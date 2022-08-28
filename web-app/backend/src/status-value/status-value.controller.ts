import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {StatusValueService} from "./status-value.service";
import {SensorValue} from "../sensor-value/entities/sensor-value.entity";
import {CreateSensorValueDto} from "../sensor-value/dto/create-sensor-value.dto";
import {CreateStatusValueDto} from "./dto/create-status-value.dto";
import {StatusValue} from "./entities/status-value.entity";
import {UpdateDeviceDto} from "../device/dto/update-device.dto";
import {UpdateStatusValueDto} from "./dto/update-status-value.dto";


@Controller('status-value')
export class StatusValueController {

    constructor(private readonly statusValueService: StatusValueService) {}


    @Post()
    @ApiOperation({ summary: 'Create a status value' })
    @ApiCreatedResponse({
        description: ' a status value created ',
        type: StatusValue
    })
    async create(@Body() createStatusValueDto: CreateStatusValueDto):Promise<StatusValue> {
        return await this.statusValueService.create(createStatusValueDto);
    }


    @Get()
    @ApiOperation({ summary: 'Get all statusValues' })
    @ApiResponse({ status: 200, description: 'Ok' })
    async findAll() {
        return await this.statusValueService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a status value' })
    @ApiResponse({ status: 200, description: 'Ok' })
    @ApiResponse({ status: 404, description: 'could not find matching statusValue' })
    async findOne(@Param('id') id: string) {
        return await this.statusValueService.findOne(id);
    }


    @Patch(':id')
    @ApiOperation({summary: 'Updated'})
    @ApiResponse({status:200, description: 'Ok'})
    @ApiResponse({status:404, description: 'could not find matching status '})
    async update(@Param('id') id: string, @Body() updateStatusValueDto: UpdateStatusValueDto) {
        return await this.statusValueService.update(id, updateStatusValueDto);
    }



    @Delete(':id')
    @ApiOperation({ summary: 'Delete a status value' })
    @ApiResponse({ status: 200, description: 'Deleted' })
    @ApiResponse({ status: 404, description: 'could not find matching status value' })
    async remove(@Param('id') id: string) {
        return await this.statusValueService.remove(id);
    }
}
