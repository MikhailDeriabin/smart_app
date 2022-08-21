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

    async insertDevice(createDeviceDto: CreateDeviceDto): Promise<Device|null> {

        let device = new Device();
        const deviceName = createDeviceDto.deviceName;
        const deviceConsumption = createDeviceDto.deviceConsumption;
        const deviceBordId = createDeviceDto.bordId;
        const manufacturer = await this.manufacturerService.findManufacturerByName(createDeviceDto.manufacturer);
        const type = await this.typeService.findTypeByName(createDeviceDto.type);
        const status = await this.statusService.findStatusByName("off");
        const deviceGroup = await this.deviceGroupService.findDeviceGroupByName(createDeviceDto.deviceGroup);
        const room = await this.roomService.findRoomByName(createDeviceDto.room)


        device.deviceName = deviceName;
        device.deviceConsumption = deviceConsumption;
        device.bordId = deviceBordId;
        device.manufacturer = manufacturer;
        device.type = type;
        device.status = status;

        if (deviceName == null){
            device = null;
            return device
        }
        if (deviceConsumption == null){
            device.deviceConsumption = 0;
        }

        if(deviceBordId == null){
            device.bordId = 0;
        }

        if (manufacturer == null){
            device = null;
            return device;
        }
        if (type == null){
            device = null;
            return device;
        }

        if(status != null){
           device.status = status;
        }

        if(deviceGroup!=null){
            device.deviceGroup = deviceGroup;
        }
        if(room!=null){
            device.room = room;
        }

        return await this.deviceRepository.save(device);
    }

    async findAll(): Promise<Device[]> {
        return await this.deviceRepository.find({
            relations: ['deviceGroup', 'room','manufacturer','status','type']
        });

    }

    async findDeviceById(id: string): Promise<Device> {
        return await this.deviceRepository.findOneOrFail(id,{
            relations: ['deviceGroup', 'room','manufacturer','status','type']
        });
    }

    async findDeviceByName(deviceName: string): Promise<Device> {
        return await this.deviceRepository.findOne({where: {deviceName: deviceName},relations: ['deviceGroup', 'room','manufacturer','status','type']});
    }

    async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
        // await this.deviceRepository.update(id, {
        //     ...(updateDeviceDto.deviceName && { deviceName: updateDeviceDto.deviceName }),
        // });

        const updatedDevice = await this.findDeviceById(id);
        // await this.remove(id);
        //
        const updatedDeviceName = updateDeviceDto.deviceName;
        const updatedDeviceBordId = updateDeviceDto.bordId;
        const updatedDeviceGroup = await this.deviceGroupService.findDeviceGroupByName(updateDeviceDto.deviceGroup);
        const updatedRoom = await this.roomService.findRoomByName(updateDeviceDto.room);
        const updatedStatus = await this.statusService.findStatusByName(updateDeviceDto.status)

        if(updatedDeviceName!=null){
            updatedDevice.deviceName = updatedDeviceName
        }
        if(updatedDeviceBordId!=null){
            updatedDevice.bordId = updatedDeviceBordId
        }
        if(updatedDeviceGroup!=null){
            updatedDevice.deviceGroup = updatedDeviceGroup
        }
        if(updatedRoom!=null){
            updatedDevice.room = updatedRoom
        }
        if(updatedStatus!=null){
            updatedDevice.status = updatedStatus
        }
        await this.deviceRepository.update(id, {
            ...(updatedDevice.deviceName && { deviceName: updatedDevice.deviceName }),
            ...(updatedDevice.bordId && { bordId: updatedDevice.bordId }),
            ...(updatedDevice.status!=null && { status: updatedDevice.status }),
            ...(updatedDevice.deviceGroup && { deviceGroup: updatedDevice.deviceGroup }),
            ...(updatedDevice.room && { room: updatedDevice.room }),

        });


        //
        // return await this.deviceRepository.save(updatedDevice)
        return this.deviceRepository.findOneOrFail(id,{relations: ['deviceGroup', 'room','manufacturer','status','type']});
    }

    async remove(id: string): Promise<Device> {
        const device = await this.deviceRepository.findOneOrFail(id);
        await this.deviceRepository.remove(device);
        return device;
    }
}
