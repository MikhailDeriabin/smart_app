import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "../../device/entities/device.entity";
import {Type} from "../../type/entities/type.entity";

@Entity()
export class Manufacturer {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    name: string;

    @ApiProperty({ type: () => Device })
    @OneToMany(() => Device, (device) => device.manufacturer)
    devices?: Device[];

    @ApiProperty({ type: () => Type })
    @OneToMany(() => Type, (type) => type.manufacturer)
    types?: Type[];

}
