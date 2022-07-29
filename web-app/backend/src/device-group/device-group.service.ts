import { Injectable } from '@nestjs/common';
import { CreateDeviceGroupDto } from './dto/create-device-group.dto';
import { UpdateDeviceGroupDto } from './dto/update-device-group.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DeviceGroup} from "./entities/device-group.entity";

@Injectable()
export class DeviceGroupService {

  constructor(
      @InjectRepository(DeviceGroup) private readonly deviceGroupRepository: Repository<DeviceGroup>

  ) {}

  create(createDeviceGroupDto: CreateDeviceGroupDto) {
    return 'This action adds a new deviceGroup';
  }

  findAll() {
    return `This action returns all deviceGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceGroup`;
  }

  async findDeviceGroupByName(deviceGroupName: string): Promise<DeviceGroup> {
    return await this.deviceGroupRepository.findOne({ where: { deviceGroupName: deviceGroupName } });
  }

  update(id: number, updateDeviceGroupDto: UpdateDeviceGroupDto) {
    return `This action updates a #${id} deviceGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceGroup`;
  }
}
