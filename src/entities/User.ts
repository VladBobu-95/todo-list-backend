import {
Entity,
PrimaryGeneratedColumn,
Column,
CreateDateColumn,
OneToMany,
} from 'typeorm';
import { Task } from './Task';
import { TaskHistory } from './TaskHistory';



@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column({ unique: true })
    email!: string;
    @Column()
    password!: string;
    @CreateDateColumn()
    createdAt!: Date;
    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];
    @OneToMany(() => TaskHistory, history => history.user)
    taskHistories!: TaskHistory[];
}
