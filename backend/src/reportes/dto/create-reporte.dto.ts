import {
    IsInt,
    IsNotEmpty,
    IsString,
    IsUUID,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateReporteDto {
    @IsUUID('4', { message: 'El ID del área debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El área es obligatoria' })
    areaId: string;

    @IsUUID('4', { message: 'El ID de la sala debe ser un UUID válido' })
    @IsNotEmpty({ message: 'La sala es obligatoria' })
    salaId: string;

    @IsInt({ message: 'El mes debe ser un número entero' })
    @Min(1, { message: 'El mes debe estar entre 1 y 12' })
    @Max(12, { message: 'El mes debe estar entre 1 y 12' })
    @IsNotEmpty({ message: 'El mes es obligatorio' })
    mes: number;

    @IsInt({ message: 'El año debe ser un número entero' })
    @Min(2020, { message: 'El año debe ser mayor o igual a 2020' })
    @Max(2100, { message: 'El año debe ser menor o igual a 2100' })
    @IsNotEmpty({ message: 'El año es obligatorio' })
    anio: number;

    @IsString()
    @IsNotEmpty({ message: 'El líder de sala es obligatorio' })
    @MaxLength(100)
    liderSala: string;

    @IsString()
    @IsNotEmpty({ message: 'El asistente es obligatorio' })
    @MaxLength(100)
    asistente: string;

    @IsInt({ message: 'La cantidad de observaciones debe ser un número entero' })
    @Min(2, { message: 'La cantidad de observaciones debe estar entre 2 y 7' })
    @Max(7, { message: 'La cantidad de observaciones debe estar entre 2 y 7' })
    @IsNotEmpty({ message: 'La cantidad de observaciones es obligatoria' })
    cantidadObservaciones: number;
}