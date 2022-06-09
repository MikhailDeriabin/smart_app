import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;
    created?: Date;
    modified?: Date;
    isValid?: boolean

}
