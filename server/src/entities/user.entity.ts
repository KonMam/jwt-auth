import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    Unique, 
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm'
import {
    Length,
    IsEmail
} from 'class-validator'

import { Task } from './task.entity'

@Unique(["username", "email"])
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @Length(4,20)
    username: string

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column()
    password: string

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

    @CreateDateColumn()
    createdDate: Date;
    
    @UpdateDateColumn()
    updatedDate: Date;
}