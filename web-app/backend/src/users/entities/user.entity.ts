import {
    Column, CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;

    @ApiProperty()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated: Date;
    
    @Column()
    isValid: boolean

}
