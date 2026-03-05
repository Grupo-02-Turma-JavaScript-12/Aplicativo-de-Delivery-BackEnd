import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Matheus Carvalho' })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'matheus@email.com' })
  usuario: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'senha1234' })
  senha: string;

  @ApiProperty({
    example: 'https://i.imgur.com/minhafoto.png',
    required: false,
  })
  foto: string;
}
