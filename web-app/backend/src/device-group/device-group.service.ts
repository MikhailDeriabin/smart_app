import { Injectable } from '@nestjs/common';
import { CreateDeviceGroupDto } from './dto/create-device-group.dto';
import { UpdateDeviceGroupDto } from './dto/update-device-group.dto';

@Injectable()
export class DeviceGroupService {
  create(createDeviceGroupDto: CreateDeviceGroupDto) {
    return 'This action adds a new deviceGroup';
  }

  findAll() {
    return `This action returns all deviceGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceGroup`;
  }

  update(id: number, updateDeviceGroupDto: UpdateDeviceGroupDto) {
    return `This action updates a #${id} deviceGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceGroup`;
  }
}
