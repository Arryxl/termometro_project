import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Index,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { ReporteMensual } from '../../reportes/entities/reporte-mensual.entity';

@Entity('areas')
export class Area {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    @Index()
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    // Relaciones
    @OneToMany(() => Usuario, (usuario) => usuario.area)
    usuarios: Usuario[];

    @OneToMany(() => ReporteMensual, (reporte) => reporte.area)
    reportes: ReporteMensual[];
}