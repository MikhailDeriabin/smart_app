import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Manufacturer} from "../manufacturer/entities/manufacturer.entity";
import {ManufacturerController} from "../manufacturer/manufacturer.controller";
import {ManufacturerService} from "../manufacturer/manufacturer.service";
import {Status} from "./entities/status.entity";
import {TypeModule} from "../type/type.module";

@Module({
  imports: [TypeOrmModule.forFeature([Status]), TypeModule],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}


