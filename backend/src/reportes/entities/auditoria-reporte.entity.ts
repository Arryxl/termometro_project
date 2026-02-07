import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ReporteMensual } from './reporte-mensual.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

export enum AccionAuditoria {
    CREAR = 'crear',
    EDITAR = 'editar',
    ELIMINAR = 'eliminar',
}

@Entity('auditoria_reportes')
export class AuditoriaReporte {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    reporteId: string;

    @ManyToOne(() => ReporteMensual)
    @JoinColumn({ name: 'reporteId' })
    reporte: ReporteMensual;

    @Column({ type: 'uuid' })
    usuarioId: string;

    @ManyToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: 'usuarioId' })
    usuario: Usuario;

    @Column({
        type: 'enum',
        enum: AccionAuditoria,
    })
    accion: AccionAuditoria;

    @Column({ type: 'jsonb', nullable: true })
    datosAnteriores: any;

    @Column({ type: 'jsonb', nullable: true })
    datosNuevos: any;

    @CreateDateColumn()
    fechaAccion: Date;
}