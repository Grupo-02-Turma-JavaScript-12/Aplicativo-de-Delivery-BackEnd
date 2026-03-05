import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'Matheus Carvalho Atualizado' })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'matheus.novo@email.com' })
  usuario: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'novasenha123' })
  senha: string;

  @ApiProperty({ example: 'https://i.imgur.com/novafoto.png', required: false })
  foto: string;
}
