import { Module } from '@nestjs/common';
import {CommandValueController} from "./command-value.controller";
import {CommandValueService} from "./command-value.service";
// import { CommandValueController } from './command-value.controller.ts';
// import { CommandValueService } from './command-value.service.ts';

@Module({
  controllers: [CommandValueController],
  providers: [CommandValueService]
})
export class CommandValueModule {}
