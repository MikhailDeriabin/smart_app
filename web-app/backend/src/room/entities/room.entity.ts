import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "../../device/entities/device.entity";

@Entity()
export class Room {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    name: string;

    @ApiProperty({ type: () => Device })
    @OneToMany(() => Device, (device) => device.room)
    devices?: Device[];

}
