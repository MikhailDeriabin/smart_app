import { Module } from '@nestjs/common';
import { DeviceGroupService } from './device-group.service';
import { DeviceGroupController } from './device-group.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DeviceGroup} from "./entities/device-group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DeviceGroup])],
  controllers: [DeviceGroupController],
  providers: [DeviceGroupService],
  exports: [DeviceGroupService]
})
export class DeviceGroupModule {}

