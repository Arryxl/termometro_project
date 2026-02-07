import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(
    OmitType(CreateUsuarioDto, ['password'] as const),
) {
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}