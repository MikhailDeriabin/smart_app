import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Status} from "../status/entities/status.entity";
import {StatusController} from "../status/status.controller";
import {StatusService} from "../status/status.service";
import {Type} from "./entities/type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule {}

