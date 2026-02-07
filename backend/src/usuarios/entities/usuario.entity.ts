import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Area } from '../../areas/entities/area.entity';
import { ReporteMensual } from '../../reportes/entities/reporte-mensual.entity';
import { Exclude } from 'class-transformer';

export enum Role {
    ADMIN = 'admin',
    LIDER = 'lider',
}

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar' })
    @Exclude() // No exponer en respuestas JSON
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.LIDER,
    })
    rol: Role;

    @Column({ type: 'uuid', nullable: true })
    areaId: string;

    @ManyToOne(() => Area, { nullable: true, eager: true })
    @JoinColumn({ name: 'areaId' })
    area: Area;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'varchar', nullable: true })
    @Exclude()
    refreshToken: string;

    // Relaciones
    @OneToMany(() => ReporteMensual, (reporte) => reporte.usuarioRegistro)
    reportes: ReporteMensual[];
}