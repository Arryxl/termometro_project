import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAreaDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del área es obligatorio' })
    @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
}