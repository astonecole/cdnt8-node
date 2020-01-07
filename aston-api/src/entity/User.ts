import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
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

    // @Column()
    // birth: Date = new Date();

    @Column('timestamp')
    birthdate: Date = new Date();

    @ManyToMany(type => Role, role => role.users)
    @JoinTable({ name: 'user_has_role' })
    roles: Role[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
