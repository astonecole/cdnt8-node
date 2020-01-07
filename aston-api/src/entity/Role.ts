import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany
} from 'typeorm';

import { IsAlpha, IsUUID, IsDate } from 'class-validator';
import { User } from './User';

@Entity()
export class Role {

    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsAlpha()
    @Column({ unique: true, length: 60 })
    name: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];

    @IsDate()
    @CreateDateColumn()
    createdAt: Date;
}
