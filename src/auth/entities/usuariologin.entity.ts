import { ApiProperty } from '@nestjs/swagger';

export class UsuarioLogin {
  @ApiProperty({ example: 'nome@gmail.com' })
  public usuario: string;

  @ApiProperty({ example: '12345678' })
  public senha: string;
}
