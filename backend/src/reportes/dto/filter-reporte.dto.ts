import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterReporteDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(12)
    @Type(() => Number)
    mes?: number;

    @IsOptional()
    @IsInt()
    @Min(2020)
    @Max(2100)
    @Type(() => Number)
    anio?: number;

    @IsOptional()
    @IsUUID('4')
    areaId?: string;

    @IsOptional()
    @IsUUID('4')
    salaId?: string;
}