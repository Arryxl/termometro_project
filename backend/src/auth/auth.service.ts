import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const usuario = await this.validateUser(loginDto.email, loginDto.password);

        const tokens = await this.generateTokens(usuario);

        // Guardar refresh token en la base de datos
        await this.usuariosService.updateRefreshToken(usuario.id, tokens.refreshToken);

        return {
        ...tokens,
        usuario: this.sanitizeUser(usuario),
        };
    }

    async refresh(refreshToken: string, usuario: Usuario): Promise<AuthResponseDto> {
        const tokens = await this.generateTokens(usuario);

        // Actualizar refresh token
        await this.usuariosService.updateRefreshToken(usuario.id, tokens.refreshToken);

        return {
        ...tokens,
        usuario: this.sanitizeUser(usuario),
        };
    }

    async logout(userId: string): Promise<void> {
        await this.usuariosService.updateRefreshToken(userId, null);
    }

    async validateUser(email: string, password: string): Promise<Usuario> {
        const usuario = await this.usuariosService.findByEmail(email);

        if (!usuario) {
        throw new UnauthorizedException('Credenciales inválidas');
        }

        if (!usuario.activo) {
        throw new UnauthorizedException('Usuario inactivo');
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);

        if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
        }

        return usuario;
    }

    private async generateTokens(usuario: Usuario) {
        const payload = { sub: usuario.id, email: usuario.email };

        const jwtSecret = this.configService.get<string>('JWT_SECRET') || 'default-secret';
        const jwtExpiration = this.configService.get('JWT_EXPIRATION') || '15m';
        const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') || 'default-refresh-secret';
        const jwtRefreshExpiration = this.configService.get('JWT_REFRESH_EXPIRATION') || '7d';

        const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
            secret: jwtSecret,
            expiresIn: jwtExpiration as any,
        }),
        this.jwtService.signAsync(payload, {
            secret: jwtRefreshSecret,
            expiresIn: jwtRefreshExpiration as any,
        }),
        ]);

        return { accessToken, refreshToken };
    }

    private sanitizeUser(usuario: Usuario): Partial<Usuario> {
        const { password, refreshToken, ...result } = usuario;
        return result;
    }
}