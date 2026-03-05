import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateEstabelecimentoDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'Vila Vert - Unidade 2' })
  nome: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Comida Natural' })
  categoria: string;

  @IsNumber()
  @ApiProperty({ example: 10.0 })
  taxa_entrega: number;
}
