import { Usuario } from '../../usuarios/entities/usuario.entity';

export class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    usuario: Partial<Usuario>;
}