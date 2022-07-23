import {
    CreateDateColumn,
    Entity,
    OneToMany,
    UpdateDateColumn,
    PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "../../device/entities/device.entity";
import {Type} from "../../type/entities/type.entity";
import {Status} from "../../status/entities/status.entity";

@Entity()
export class Manufacturer {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ unique: true })
    manufacturer: string;

    @ApiProperty()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated: Date;

    @ApiProperty({ type: () => Device })
    @OneToMany(() => Device, (device) => device.manufacturer)
    devices?: Device[];

  /*  @ApiProperty({ type: () => Type })
    @OneToMany(() => Type, (type) => type.manufacturer)
    types?: Type[];*/

    @ApiProperty({ type: () => Type })
    @ManyToMany(() => Type, (type) => type.manufacturers, { cascade: true })
    @JoinTable()
    types?: Type[];

}
