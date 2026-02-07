import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateSalaDto {
    @IsInt({ message: 'El número debe ser un entero' })
    @Min(1, { message: 'El número debe ser mayor a 0' })
    @Max(999, { message: 'El número no puede exceder 999' })
    @IsNotEmpty({ message: 'El número de sala es obligatorio' })
    numero: number;

    @IsString()
    @IsNotEmpty({ message: 'El nombre de la sala es obligatorio' })
    @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
    nombre: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    liderActual?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    asistenteActual?: string;
}