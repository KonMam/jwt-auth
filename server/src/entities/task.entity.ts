import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne 
} from 'typeorm'

import { User } from './user.entity'

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: string 

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.tasks)
    user: User

    @CreateDateColumn()
    createdDate: Date;
    
    @UpdateDateColumn()
    updatedDate: Date;
}