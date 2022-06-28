import {
    CreateDateColumn,
    Entity,
    OneToMany,
    UpdateDateColumn,
    PrimaryColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "../../device/entities/device.entity";
import {Type} from "../../type/entities/type.entity";

@Entity()
export class Manufacturer {

    @ApiProperty()
    @PrimaryColumn()
    manufacturerName: string;

    @ApiProperty()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated: Date;

    @ApiProperty({ type: () => Device })
    @OneToMany(() => Device, (device) => device.manufacturer)
    devices?: Device[];

    @ApiProperty({ type: () => Type })
    @OneToMany(() => Type, (type) => type.manufacturer)
    types?: Type[];

}
