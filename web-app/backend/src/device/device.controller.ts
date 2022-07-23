import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {Device} from "./entities/device.entity";
import {ApiCreatedResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new device' })
  @ApiCreatedResponse({
    description: 'Device has been successfully created ',
    type: Device
  })
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.deviceService.insertDevice(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all devices' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll() {
    return await this.deviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a device' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'could not find matching device id' })
  async findDeviceById(@Param('id') id: string): Promise<Device> {
    return await this.deviceService.findDeviceById(id);
  }


  @Patch(':id')
  @ApiOperation({summary: 'Updated'})
  @ApiResponse({status:200, description: 'Ok'})
  @ApiResponse({status:404, description: 'could not find matching device id'})
  async update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return await this.deviceService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the device' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'could not find matching device id' })
  async remove(@Param('id') id: string) {
    return await this.deviceService.remove(id);
  }
}
