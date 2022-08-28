import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CommandValueService} from "../command-value/command-value.service.ts";
import {ApiCreatedResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {SensorValueService} from "./sensor-value.service";
import {DeviceGroup} from "../device-group/entities/device-group.entity";
import {CreateDeviceGroupDto} from "../device-group/dto/create-device-group.dto";
import {SensorValue} from "./entities/sensor-value.entity";
import {CreateSensorValueDto} from "./dto/create-sensor-value.dto";
import {UpdateDeviceDto} from "../device/dto/update-device.dto";
import {UpdateSensorValueDto} from "./dto/update-sensor-value.dto";

@Controller('sensor-value')
export class SensorValueController {

    constructor(private readonly sensorValueService: SensorValueService) {}

    @Post()
    @ApiOperation({ summary: 'Create a sensor value' })
    @ApiCreatedResponse({
        description: ' a sensor value created ',
        type: SensorValue
    })
    async create(@Body() createSensorValueDto: CreateSensorValueDto):Promise<SensorValue> {
        return await this.sensorValueService.create(createSensorValueDto);
    }



    @Get()
    @ApiOperation({ summary: 'Get all sensor values' })
    @ApiResponse({ status: 200, description: 'Ok' })
    async findAll() {
        return await this.sensorValueService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a sensor value' })
    @ApiResponse({ status: 200, description: 'Ok' })
    @ApiResponse({ status: 404, description: 'could not find matching sensor value' })
    async findOne(@Param('id') id: string) {
        return await this.sensorValueService.findOne(id);
    }



    @Patch(':id')
    @ApiOperation({summary: 'Updated'})
    @ApiResponse({status:200, description: 'Ok'})
    @ApiResponse({status:404, description: 'could not find matching sensor group'})
    async update(@Param('id') id: string, @Body() updateSensorValueDto: UpdateSensorValueDto) {
        return await this.sensorValueService.update(id, updateSensorValueDto);
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Delete a sensor group' })
    @ApiResponse({ status: 200, description: 'Deleted' })
    @ApiResponse({ status: 404, description: 'could not find matching sensor group' })
    async remove(@Param('id') id: string) {
        return await this.sensorValueService.remove(id);
    }

}
