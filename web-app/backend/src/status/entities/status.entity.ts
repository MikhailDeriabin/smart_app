import {Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "../../device/entities/device.entity";
import {Type} from "../../type/entities/type.entity";

@Entity()
export class Status {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    status: string;

    @ApiProperty({ type: () => Device })
    @OneToMany(() => Device, (device) => device.status)
    devices?: Device[];

    @ApiProperty({ type: () => Type })
    @ManyToMany(() => Type, (type) => type.statuses, { cascade: true })
    @JoinTable()
    types: Type[];

}
