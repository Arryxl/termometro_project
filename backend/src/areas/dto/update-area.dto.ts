import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDto } from './create-area.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}