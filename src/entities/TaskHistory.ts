import {
PrimaryGeneratedColumn,
Column,
ManyToOne,
CreateDateColumn,
Entity,
JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class TaskHistory {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    taskId!: number;
    @Column()
    userId!: number;
    @Column()
    action!: string;
    @Column({ type: 'text', nullable: true })
    previousValue?: string;
    @Column({ type: 'text', nullable: true })
    newValue?: string;
    @CreateDateColumn()
    createdAt!: Date;
    @ManyToOne(() => User, user => user.taskHistories)
    @JoinColumn({ name: 'userId' })
    user!: User;
}
