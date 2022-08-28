import { Module } from '@nestjs/common';
import {CommandValueController} from "./command-value.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommandValueService} from "./command-value.service";
import {CommandValue} from "./entities/command-value.entity";


@Module({
  imports: [TypeOrmModule.forFeature([CommandValue])],
  controllers: [CommandValueController],
  providers: [CommandValueService],
  exports: [CommandValueService]
})
export class CommandValueModule {}
