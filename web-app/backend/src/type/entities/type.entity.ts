import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Device} from "../../device/entities/device.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Manufacturer} from "../../manufacturer/entities/manufacturer.entity";
import {Status} from "../../status/entities/status.entity";

@Entity()
export class Type {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    typeName: string;

    @ApiProperty()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated: Date;

    @ApiProperty({ type: () => Device })
    @OneToMany(() => Device, (device) => device.type)
    devices?: Device[];

    @ApiProperty({ type: () => Manufacturer })
    @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.types)
    manufacturer: Manufacturer;

    @ApiProperty({ type: () => Status })
    @ManyToMany(() => Status, (status) => status.types, { cascade: true })
    @JoinTable()
    statuses: Status[];

}
