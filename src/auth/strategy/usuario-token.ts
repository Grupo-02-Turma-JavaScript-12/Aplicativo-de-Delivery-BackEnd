import { TipoUsuario } from '../../usuario/entities/usuario.entity';

export interface UsuarioToken {
  userId: number;
  username: string;
  role: TipoUsuario;
}
