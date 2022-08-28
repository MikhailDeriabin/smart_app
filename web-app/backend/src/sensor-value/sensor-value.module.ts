import { Module } from '@nestjs/common';
import { SensorValueController } from './sensor-value.controller';
import {SensorValueService} from "./sensor-value.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SensorValue} from "./entities/sensor-value.entity";



@Module({
  imports: [TypeOrmModule.forFeature([SensorValue])],
  controllers: [SensorValueController],
  providers: [SensorValueService],
  exports: [SensorValueService]
})
export class SensorValueModule {}
