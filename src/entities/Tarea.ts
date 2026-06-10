import{
PrimaryGeneratedColumn,
Column,
ManyToOne,
CreateDateColumn,
Entity,
UpdateDateColumn,
} from 'typeorm';
import { Usuario } from './Usuario';


@Entity()
export class Tarea {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    usuarioId!: number;
    @Column()
    titulo!: string;
    @Column({nullable: true})
    descripcion?: string;
    @Column({default: false})
    completada!: boolean;
    @CreateDateColumn()
    createdAt!: Date;
    @ManyToOne(() => Usuario, usuario => usuario.id)
    usuario!: Usuario;
    @UpdateDateColumn()
    updatedAt!: Date;
}



