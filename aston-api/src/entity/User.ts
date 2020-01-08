import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    BeforeInsert,
    BeforeUpdate
} from 'typeorm';

import { Role } from './Role';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column('timestamp')
    birthdate: Date = new Date();

    @ManyToMany(type => Role, role => role.users, {
        eager: true
    })
    @JoinTable({ name: 'user_has_role' })
    roles: Role[];

    @CreateDateColumn()
    createdAt: Date;

    hasRole(name: string) {
        return this.roles.some((role: Role) => {
            return role.name === name;
        });
    }

    hasPrivilege(operation: string) {
        return this.roles.some((role: Role) => {
            return role.hasPermission(operation);
        });
    }

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeUpdate()
    @BeforeInsert()
    updateDates() {
        this.birthdate = new Date();
    }
}
