import { Injectable } from '@nestjs/common';
import { CreateDeviceGroupDto } from './dto/create-device-group.dto';
import { UpdateDeviceGroupDto } from './dto/update-device-group.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DeviceGroup} from "./entities/device-group.entity";
import {DeviceService} from "../device/device.service";

@Injectable()
export class DeviceGroupService {

  constructor(
      @InjectRepository(DeviceGroup)
      private readonly deviceGroupRepository: Repository<DeviceGroup>,
  ) {}

  async create(createDeviceGroupDto: CreateDeviceGroupDto): Promise<DeviceGroup> {
    const deviceGroup = new DeviceGroup();
    deviceGroup.deviceGroup = createDeviceGroupDto.deviceGroup
    return await this.deviceGroupRepository.save(deviceGroup);
  }

  async findAll(): Promise<DeviceGroup[]> {
    return await this.deviceGroupRepository.find({
      // relations: ['device']
    });
  }

  async findOne(id: string): Promise<DeviceGroup> {
    return await this.deviceGroupRepository.findOneOrFail(id, {
      relations: ['device'],
    });
  }

  async findDeviceGroupByName(deviceGroup: string): Promise<DeviceGroup> {
    return await this.deviceGroupRepository.findOne({ where: { deviceGroup: deviceGroup } });
  }

 /* async update(id: string, updateDeviceGroupDto: UpdateDeviceGroupDto): Promise<DeviceGroup> {
    return await`This action updates a #${id} deviceGroup`;
  }*/

  async remove(id: string): Promise<DeviceGroup> {
    const deviceGroup = await this.findOne(id);
    await this.deviceGroupRepository.remove(deviceGroup);
    return deviceGroup;
  }
}
