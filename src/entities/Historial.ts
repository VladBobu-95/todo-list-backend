import{
PrimaryGeneratedColumn,
Column,
ManyToOne,
CreateDateColumn,
Entity
} from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Historial {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    tareaId!: number;
    @Column()
    usuarioId!: number;
    @Column()
    accion!: string;
    @Column({nullable: true})
    valorAnterior?: string;
    @Column({nullable: true})
    valorNuevo?: string;
    @CreateDateColumn()
    createdAt!: Date;
    @ManyToOne(() => Usuario, usuario => usuario.id)
    usuario!: Usuario;
}

