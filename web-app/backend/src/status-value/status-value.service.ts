import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {StatusValue} from "./entities/status-value.entity";
import {SensorValue} from "../sensor-value/entities/sensor-value.entity";
import {CreateSensorValueDto} from "../sensor-value/dto/create-sensor-value.dto";
import {CreateStatusValueDto} from "./dto/create-status-value.dto";
import {UpdateSensorValueDto} from "../sensor-value/dto/update-sensor-value.dto";
import {UpdateStatusValueDto} from "./dto/update-status-value.dto";

@Injectable()
export class StatusValueService {

    constructor(
        @InjectRepository(StatusValue)
        private readonly statusValueRepository: Repository<StatusValue>,
    ) {}


    async create(createStatusValueDto: CreateStatusValueDto): Promise<StatusValue> {
        const statusValue = new StatusValue();
        statusValue.statusName = createStatusValueDto.statusName;
        statusValue.statusValue = createStatusValueDto.statusValue;
        // deviceGroup.deviceGroup = createSensorValueDto.deviceGroup
        return await this.statusValueRepository.save(statusValue);
    }

    async findAll(): Promise<StatusValue[]> {
        return await this.statusValueRepository.find({ relations: ['device'] });
    }

    async findOne(id: string): Promise<StatusValue> {
        return await this.statusValueRepository.findOneOrFail(id, {
            relations: ['device'],
        });
    }


    async findStatusValueByName(statusName: string): Promise<StatusValue> {
        return await this.statusValueRepository.findOne({ where: { statusName: statusName } });
    }

    async update(id: string, updateStatusValueDto: UpdateStatusValueDto): Promise<StatusValue> {


        await this.statusValueRepository.update(id, {
            ...(updateStatusValueDto.statusName && { statusName: updateStatusValueDto.statusName }),
            ...(updateStatusValueDto.statusValue && { statusValue: updateStatusValueDto.statusValue }),
        });

        return this.statusValueRepository.findOneOrFail(id,{relations: ['device']});
    }


    async remove(id: string): Promise<StatusValue> {
        const statusValue = await this.findOne(id);
        await this.statusValueRepository.remove(statusValue);
        return statusValue;
    }

}
