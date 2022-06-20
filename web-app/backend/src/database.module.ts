import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    "imports": [
        TypeOrmModule.forRootAsync({
            "imports": [ConfigModule],
            "inject": [ConfigService],
            "useFactory": (configService: ConfigService) => ({
                "type": 'mariadb',
                "host": 'localhost',
                //"host": configService.get('DATABASE_HOST'),
                "port": configService.get('DATABASE_PORT'),
                /*"username": configService.get('DATABASE_USERNAME'),*/
                "username": 'root',
               /* "password": configService.get('DATABASE_PASSWORD'),*/
                "password": 'password',
                /*"database": configService.get('DATABASE_NAME'),*/
                "database": 'smartApp',
                "entities": ['/**/*.entity{.ts,.js}'],
                "synchronize": false,
            }),
        }),
    ],
})
export class DatabaseModule {}
