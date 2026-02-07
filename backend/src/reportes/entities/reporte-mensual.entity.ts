import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    Unique,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import { Area } from '../../areas/entities/area.entity';
import { Sala } from '../../salas/entities/sala.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { AuditoriaReporte } from './auditoria-reporte.entity';

@Entity('reportes_mensuales')
@Unique(['areaId', 'salaId', 'mes', 'anio'])
@Index(['mes', 'anio'])
export class ReporteMensual {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    areaId: string;

    @ManyToOne(() => Area, { eager: true })
    @JoinColumn({ name: 'areaId' })
    area: Area;

    @Column({ type: 'uuid' })
    salaId: string;

    @ManyToOne(() => Sala, { eager: true })
    @JoinColumn({ name: 'salaId' })
    sala: Sala;

    @Column({ type: 'int', width: 2 })
    mes: number; // 1-12

    @Column({ type: 'int' })
    anio: number;

    @Column({ type: 'varchar', length: 100 })
    liderSala: string;

    @Column({ type: 'varchar', length: 100 })
    asistente: string;

    @Column({ type: 'int' })
    cantidadObservaciones: number; // 2-7

    @Column({ type: 'decimal', precision: 4, scale: 2, default: 0 })
    porcentajeResta: number; // 0-5

    @Column({ type: 'uuid' })
    usuarioRegistroId: string;

    @ManyToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: 'usuarioRegistroId' })
    usuarioRegistro: Usuario;

    @CreateDateColumn()
    fechaRegistro: Date;

    @UpdateDateColumn()
    fechaModificacion: Date;

    // Relaciones
    @OneToMany(() => AuditoriaReporte, (auditoria) => auditoria.reporte)
    auditorias: AuditoriaReporte[];

    // Hook para calcular porcentaje automáticamente
    @BeforeInsert()
    @BeforeUpdate()
    calcularPorcentaje() {
        const escalaPenalizacion = {
        2: 0,
        3: 1,
        4: 2,
        5: 3,
        6: 4,
        7: 5,
        };

        this.porcentajeResta =
        escalaPenalizacion[this.cantidadObservaciones] || 0;
    }
}