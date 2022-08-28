import { Module } from '@nestjs/common';
import { StatusValueController } from './status-value.controller';
import { StatusValueService } from './status-value.service';

@Module({
  controllers: [StatusValueController],
  providers: [StatusValueService]
})
export class StatusValueModule {}
