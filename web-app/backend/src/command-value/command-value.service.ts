import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CommandValue} from "./entities/command-value.entity";
import {SensorValue} from "../sensor-value/entities/sensor-value.entity";
import {CreateSensorValueDto} from "../sensor-value/dto/create-sensor-value.dto";
import {CreateCommandValueDto} from "./dto/create-command-value.dto";
import {UpdateSensorValueDto} from "../sensor-value/dto/update-sensor-value.dto";
import {UpdateCommandValueDto} from "./dto/update-command-value.dto";

@Injectable()
export class CommandValueService {

    constructor(
        @InjectRepository(CommandValue)
        private readonly commandValueRepository: Repository<CommandValue>,
    ) {}


    async create(createStatusValueDto: CreateCommandValueDto): Promise<CommandValue> {
        const commandValue = new CommandValue();
        commandValue.commandName = createStatusValueDto.commandName;
        commandValue.commandValue = createStatusValueDto.commandValue;
        // deviceGroup.deviceGroup = createSensorValueDto.deviceGroup
        return await this.commandValueRepository.save(commandValue);
    }

    async findAll(): Promise<CommandValue[]> {
        return await this.commandValueRepository.find({ relations: ['device'] });
    }

    async findOne(id: string): Promise<CommandValue> {
        return await this.commandValueRepository.findOneOrFail(id, {
            relations: ['device'],
        });
    }


    async findStatusValueByName(statusName: string): Promise<CommandValue> {
        return await this.commandValueRepository.findOne({ where: { statusName: statusName } });
    }

    async update(id: string, updateCommandValueDto: UpdateCommandValueDto): Promise<CommandValue> {


        await this.commandValueRepository.update(id, {
            ...(updateCommandValueDto.commandName && { commandName: updateCommandValueDto.commandName }),
            ...(updateCommandValueDto.commandValue && { statusValue: updateCommandValueDto.commandValue }),
        });

        return this.commandValueRepository.findOneOrFail(id,{relations: ['device']});
    }


    async remove(id: string): Promise<CommandValue> {
        const statusValue = await this.findOne(id);
        await this.commandValueRepository.remove(statusValue);
        return statusValue;
    }

}
