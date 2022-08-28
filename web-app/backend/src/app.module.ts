import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DeviceModule } from './device/device.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { TypeModule } from './type/type.module';
import { DeviceGroupModule } from './device-group/device-group.module';
import { RoomModule } from './room/room.module';
import { StatusModule } from './status/status.module';
import { CommandModule } from './command/command.module';
import { CommandValueModule } from './command-value/command-value.module';
import { SensorValueService } from './sensor-value/sensor-value.service';
import { SensorValueModule } from './sensor-value/sensor-value.module';
// import dotenv from 'dotenv';
// dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      // type: process.env.DATABASE_DIALECT,
      host: 'localhost',
      port: 3306,
      // port: process.env.DATABASE_PORT,
      username: 'root',
      password: 'password',
      database: 'smartApp',
      autoLoadEntities: true,
     // entities: [Test],
      // we should not use it in the production
      synchronize: true,
    }),UsersModule, DeviceModule, ManufacturerModule, TypeModule, DeviceGroupModule, RoomModule, StatusModule, CommandModule, CommandValueModule, SensorValueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


/*@Module({
  imports: [
  ConfigModule.forRoot({}),
    DatabaseModule,UsersModule, DeviceModule, ManufacturerModule, TypeModule, DeviceGroupModule, RoomModule, StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService,ConfigService],

})*/


export class AppModule {}
