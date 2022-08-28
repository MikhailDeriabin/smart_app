import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceGroupService } from './device-group.service';
import { CreateDeviceGroupDto } from './dto/create-device-group.dto';
import { UpdateDeviceGroupDto } from './dto/update-device-group.dto';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {DeviceGroup} from "./entities/device-group.entity";

@Controller('device-group')
export class DeviceGroupController {
  constructor(private readonly deviceGroupService: DeviceGroupService) {}

  @Post()
  @ApiOperation({ summary: 'Create a device group' })
  @ApiCreatedResponse({
    description: 'DeviceGroup has been successfully created ',
    type: DeviceGroup
  })
  async create(@Body() createDeviceGroupDto: CreateDeviceGroupDto):Promise<DeviceGroup> {
    return await this.deviceGroupService.create(createDeviceGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all device groups' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll() {
    return await this.deviceGroupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a device group' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'could not find matching device group' })
  async findOne(@Param('id') id: string) {
    return await this.deviceGroupService.findOne(id);
  }

/*  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeviceGroupDto: UpdateDeviceGroupDto) {
    return this.deviceGroupService.update(+id, updateDeviceGroupDto);
  }*/

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Device group' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'could not find matching device group' })
  async remove(@Param('id') id: string) {
    return await this.deviceGroupService.remove(id);
  }
}
