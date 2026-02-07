import { PartialType } from '@nestjs/mapped-types';
import { CreateSalaDto } from './create-sala.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSalaDto extends PartialType(CreateSalaDto) {
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}