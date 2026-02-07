import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Index,
} from 'typeorm';
import { ReporteMensual } from '../../reportes/entities/reporte-mensual.entity';

@Entity('salas')
export class Sala {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int', unique: true })
    @Index()
    numero: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    liderActual: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    asistenteActual: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    // Relaciones
    @OneToMany(() => ReporteMensual, (reporte) => reporte.sala)
    reportes: ReporteMensual[];
}