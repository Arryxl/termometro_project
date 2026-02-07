import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MinLength,
} from 'class-validator';
import { Role } from '../entities/usuario.entity';

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombre: string;

    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @IsNotEmpty({ message: 'El email es obligatorio' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    password: string;

    @IsEnum(Role, { message: 'El rol debe ser admin o lider' })
    @IsNotEmpty({ message: 'El rol es obligatorio' })
    rol: Role;

    @IsUUID('4', { message: 'El ID del área debe ser un UUID válido' })
    @IsOptional()
    areaId?: string;
}