import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateReporteDto } from './create-reporte.dto';

// No se puede cambiar área, sala, mes ni año (constraint UNIQUE)
export class UpdateReporteDto extends PartialType(
    OmitType(CreateReporteDto, ['areaId', 'salaId', 'mes', 'anio'] as const),
) {}