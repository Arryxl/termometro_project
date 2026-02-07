import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AreasModule } from './areas/areas.module';
import { SalasModule } from './salas/salas.module';
import { ReportesModule } from './reportes/reportes.module';
import { DatabaseModule } from './database/database.module';
import { DashboardModule } from './dashboard/dashboard.module';


@Module({
  imports: [AuthModule, UsuariosModule, AreasModule, SalasModule, ReportesModule, DatabaseModule, DashboardModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development', // Solo en desarrollo
        logging: configService.get('NODE_ENV') === 'development'
      })
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
