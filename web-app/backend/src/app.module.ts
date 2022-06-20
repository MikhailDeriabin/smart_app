import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {User} from "./users/entities/user.entity";
import { DeviceController } from './device/device.controller';
import { DeviceModule } from './device/device.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { TypeModule } from './type/type.module';
import { DeviceGroupModule } from './device-group/device-group.module';
import { RoomModule } from './room/room.module';
import { StatusModule } from './status/status.module';
import {Device} from "./device/entities/device.entity";




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/test7',
      autoLoadEntities: true,
     // entities: [Test],
      // we should not use it in the production
      synchronize: true,
    }),UsersModule, DeviceModule, ManufacturerModule, TypeModule, DeviceGroupModule, RoomModule, StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
