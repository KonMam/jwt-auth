import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    Unique 
} from 'typeorm'

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
}