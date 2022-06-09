import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {User} from "./users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/test1',
      autoLoadEntities: true,
      //entities: [User],
      // we should not use it in the production
      synchronize: true,
    }),UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
