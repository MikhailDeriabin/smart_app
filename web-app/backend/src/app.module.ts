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



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
     // "type": process.env.DATABASE_DIALECT,
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'smartApp',
      autoLoadEntities: true,
     // entities: [Test],
      // we should not use it in the production
      synchronize: false,
    }),UsersModule, DeviceModule, ManufacturerModule, TypeModule, DeviceGroupModule, RoomModule, StatusModule,
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
