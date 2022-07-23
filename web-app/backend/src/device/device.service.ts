import {Injectable} from '@nestjs/common';
import {CreateDeviceDto} from './dto/create-device.dto';
import {UpdateDeviceDto} from './dto/update-device.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Device} from "./entities/device.entity";
import {Repository} from "typeorm";
import {DeviceGroupService} from "../device-group/device-group.service";
import {RoomService} from "../room/room.service";
import {StatusService} from "../status/status.service";
import {TypeService} from "../type/type.service";
import {ManufacturerService} from "../manufacturer/manufacturer.service";

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
        @InjectRepository(Device) private readonly deviceRepository: Repository<Device>,
        private readonly deviceGroupService: DeviceGroupService,
        private readonly roomService: RoomService,
        private readonly statusService: StatusService,
        private readonly typeService: TypeService,
        private readonly manufacturerService: ManufacturerService
    ) {
    }

    async insertDevice(createDeviceDto: CreateDeviceDto): Promise<Device> {

        const device = new Device();
        const deviceName = createDeviceDto.deviceName;
        const deviceConsumption = createDeviceDto.deviceConsumption;
        const manufacturer = await this.manufacturerService.findManufacturerByName(createDeviceDto.manufacturer);
        const type = await this.typeService.findTypeByName(createDeviceDto.type);
        const deviceGroup = await this.deviceGroupService.findDeviceGroupByName(createDeviceDto.deviceGroup);
        const room = await this.roomService.findRoomByName(createDeviceDto.room)

        device.deviceName = deviceName;
        device.deviceConsumption = deviceConsumption;
        device.manufacturer = manufacturer;
        device.type = type;

        if(deviceGroup!=null){
            device.deviceGroup = deviceGroup
        }
        if(room!=null){
            device.room = room
        }

        return await this.deviceRepository.save(device)
    }

    async findAll(): Promise<Device[]> {
        return await this.deviceRepository.find();
    }

    async findDeviceById(id: string): Promise<Device> {
        return await this.deviceRepository.findOneOrFail(id)
    }

    async findDeviceByName(deviceName: string): Promise<Device> {
        return await this.deviceRepository.findOne({where: {deviceName: deviceName}});
    }

    async update(id: number, updateDeviceDto: UpdateDeviceDto) {
        return await `This action updates a #${id} device`;
    }

    async remove(id: string): Promise<Device> {
        const device = await this.deviceRepository.findOneOrFail(id);
        await this.deviceRepository.remove(device);
        return device;
    }
}
