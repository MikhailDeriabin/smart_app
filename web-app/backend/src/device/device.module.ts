import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Device} from "./entities/device.entity";
import {DeviceGroupModule} from "../device-group/device-group.module";
import {StatusModule} from "../status/status.module";
import {RoomModule} from "../room/room.module";
import {TypeModule} from "../type/type.module";
import {ManufacturerModule} from "../manufacturer/manufacturer.module";

@Module({
  imports: [TypeOrmModule.forFeature([Device]),DeviceGroupModule,StatusModule,RoomModule,TypeModule,ManufacturerModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}

