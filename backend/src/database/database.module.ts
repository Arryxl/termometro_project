import { Module } from '@nestjs/common';
import { SeedsService } from './seeds/seeds.service';

@Module({
  providers: [SeedsService]
})
export class DatabaseModule {}
