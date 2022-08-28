import { Module } from '@nestjs/common';
import { SensorValueController } from './sensor-value.controller';

@Module({
  controllers: [SensorValueController]
})
export class SensorValueModule {}
