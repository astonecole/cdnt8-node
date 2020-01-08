import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';

import { IsAlpha, IsUUID, IsDate } from 'class-validator';
import { User } from './User';
import { Permission } from './Permission';

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

    @ManyToMany(type => Permission, permission => permission.roles, {
        eager: true
    })
    @JoinTable({ name: 'role_has_permission' })
    permissions: Permission[];

    hasPermission(operation: string): boolean {
        return this.permissions.some((perm: Permission) => {
            return perm.operation === operation;
        });
    }

    @IsDate()
    @CreateDateColumn()
    createdAt: Date;
}
