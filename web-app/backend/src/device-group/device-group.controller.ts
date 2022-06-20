import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceGroupService } from './device-group.service';
import { CreateDeviceGroupDto } from './dto/create-device-group.dto';
import { UpdateDeviceGroupDto } from './dto/update-device-group.dto';

@Controller('device-group')
export class DeviceGroupController {
  constructor(private readonly deviceGroupService: DeviceGroupService) {}

  @Post()
  create(@Body() createDeviceGroupDto: CreateDeviceGroupDto) {
    return this.deviceGroupService.create(createDeviceGroupDto);
  }

  @Get()
  findAll() {
    return this.deviceGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceGroupDto: UpdateDeviceGroupDto) {
    return this.deviceGroupService.update(+id, updateDeviceGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceGroupService.remove(+id);
  }
}
