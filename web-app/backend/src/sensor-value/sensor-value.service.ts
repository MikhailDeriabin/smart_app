import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SensorValue} from "./entities/sensor-value.entity";
import {DeviceGroup} from "../device-group/entities/device-group.entity";
import {CreateDeviceGroupDto} from "../device-group/dto/create-device-group.dto";
import {CreateSensorValueDto} from "./dto/create-sensor-value.dto";
import {UpdateDeviceDto} from "../device/dto/update-device.dto";
import {Device} from "../device/entities/device.entity";
import {UpdateSensorValueDto} from "./dto/update-sensor-value.dto";

@Injectable()
export class SensorValueService {

    constructor(
        @InjectRepository(SensorValue)
        private readonly sensorValueRepository: Repository<SensorValue>,
    ) {}

    async create(createSensorValueDto: CreateSensorValueDto): Promise<SensorValue> {
        const sensorValue = new SensorValue();
        sensorValue.sensorName = createSensorValueDto.sensorName;
        sensorValue.sensorValue = createSensorValueDto.sensorValue;
        // deviceGroup.deviceGroup = createSensorValueDto.deviceGroup
        return await this.sensorValueRepository.save(sensorValue);
    }


    async findAll(): Promise<SensorValue[]> {
        return await this.sensorValueRepository.find({ relations: ['device'] });
    }

    async findOne(id: string): Promise<SensorValue> {
        return await this.sensorValueRepository.findOneOrFail(id, {
            relations: ['device'],
        });
    }

    async findSensorValueByName(sensorName: string): Promise<SensorValue> {
        return await this.sensorValueRepository.findOne({ where: { sensorName: sensorName } });
    }

    async update(id: string, updateSensorValueDto: UpdateSensorValueDto): Promise<SensorValue> {


        await this.sensorValueRepository.update(id, {
            ...(updateSensorValueDto.sensorName && { sensorName: updateSensorValueDto.sensorName }),
            ...(updateSensorValueDto.sensorValue && { sensorValue: updateSensorValueDto.sensorValue }),
        });

        return this.sensorValueRepository.findOneOrFail(id,{relations: ['device']});
    }



    async remove(id: string): Promise<SensorValue> {
        const sensorValue = await this.findOne(id);
        await this.sensorValueRepository.remove(sensorValue);
        return sensorValue;
    }

}
