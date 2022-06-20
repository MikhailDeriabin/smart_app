import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Manufacturer} from "./entities/manufacturer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer])],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  exports: [ManufacturerService],
})
export class ManufacturerModule {}

