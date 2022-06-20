import {Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Device} from "../../device/entities/device.entity";
import {ApiProperty} from "@nestjs/swagger";
import {DeviceGroup} from "../../device-group/entities/device-group.entity";
import {Manufacturer} from "../../manufacturer/entities/manufacturer.entity";
import {Status} from "../../status/entities/status.entity";

@Entity()
export class Type {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    type: string;

    @ApiProperty({ type: () => Device })
    @OneToMany(() => Device, (device) => device.type)
    devices?: Device[];

    @ApiProperty({ type: () => Manufacturer })
    @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.types)
    manufacturer: Manufacturer;

    @ApiProperty({ type: () => Status })
    @ManyToMany(() => Status, (status) => status.types)
    @JoinTable()
    statuses: Status[];

}
