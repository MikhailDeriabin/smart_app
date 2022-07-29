import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Device} from "./entities/device.entity";
import {Repository} from "typeorm";

@Injectable()
export class DeviceService {

/*  constructor(
      @InjectRepository(Category)
      private categoryRepository: Repository<Category>,
  ) {}

  async insertCategory(
      createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.description = createCategoryDto.description;
    return await this.categoryRepository.save(category);
  }*/

  constructor(
      @InjectRepository(Device) private readonly deviceRepository: Repository<Device>

  ) {}

  async insertDevice(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = new Device();
    device.deviceName = createDeviceDto.deviceName

    return await this.deviceRepository.save(device)
  }

  findAll() {
    return `This action returns all device`;
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  async findDeviceByName(deviceName: string): Promise<Device> {
    return await this.deviceRepository.findOne({ where: { deviceName: deviceName } });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
