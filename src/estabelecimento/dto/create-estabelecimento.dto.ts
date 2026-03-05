import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEstabelecimentoDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Vila Vert' })
  nome: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Comida Natural e Saudável' })
  categoria: string;

  @IsNumber()
  @ApiProperty({ example: 15.0, description: 'Taxa de entrega em Reais' })
  taxa_entrega: number;
}
