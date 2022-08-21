import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Manufacturer} from "../../manufacturer/entities/manufacturer.entity";
import {Status} from "../../status/entities/status.entity";
import {Type} from "../../type/entities/type.entity";
import {DeviceGroup} from "../../device-group/entities/device-group.entity";
import {Room} from "../../room/entities/room.entity";

@Entity()
export class Device {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ unique: true })
    deviceName: string;

    @ApiProperty()
    @Column()
    deviceConsumption?: number;

    @ApiProperty()
    @Column()
    bordId?: number;

    @ApiProperty()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated: Date;

    @ApiProperty({ type: () => Manufacturer })
    @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.devices)
    manufacturer: Manufacturer;

    @ApiProperty({ type: () => Status })
    @ManyToOne(() => Status, (status) => status.devices)
    status?: Status;

    @ApiProperty({ type: () => Type })
    @ManyToOne(() => Type, (type) => type.devices)
    type: Type;

    @ApiProperty({ type: () => DeviceGroup })
    @ManyToOne(() => DeviceGroup, (deviceGroup) => deviceGroup.devices)
    deviceGroup?: DeviceGroup;

    @ApiProperty({ type: () => Room})
    @ManyToOne(() => Room, (room) => room.devices)
    room?: Room;

}
