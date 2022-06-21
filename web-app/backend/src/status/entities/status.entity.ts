import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "../../device/entities/device.entity";
import {Type} from "../../type/entities/type.entity";

@Entity()
export class Status {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    statusName: string;

    @ApiProperty()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated: Date;

    @ApiProperty({ type: () => Device })
    @OneToMany(() => Device, (device) => device.status)
    devices?: Device[];

    @ApiProperty({ type: () => Type })
    @ManyToMany(() => Type, (type) => type.statuses, { cascade: true })
    @JoinTable()
    types: Type[];

}