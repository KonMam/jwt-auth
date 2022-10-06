import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    Unique, 
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm'

import { Task } from './task.entity'

@Unique(["username", "email"])
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
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