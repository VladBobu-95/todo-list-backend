import {
PrimaryGeneratedColumn,
Column,
ManyToOne,
CreateDateColumn,
Entity,
UpdateDateColumn,
JoinColumn,
} from 'typeorm';
import { User } from './User';


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    userId!: number;
    @Column()
    title!: string;
    @Column({ nullable: true })
    description?: string;
    @Column({ default: false })
    completed!: boolean;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'userId' })
    user!: User;
}
