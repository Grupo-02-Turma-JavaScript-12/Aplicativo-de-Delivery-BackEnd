import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePedidoDto {
  @IsNumber()
  @ApiProperty({ example: 5 })
  id: number;

  @IsNumber()
  @ApiProperty({ example: 70.0 })
  valor_total: number;

  @IsString()
  @ApiProperty({ example: 'Entregue' })
  status: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do Usuário',
    example: { id: 2 },
  })
  usuario: { id: number };

  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do Estabelecimento',
    example: { id: 3 },
  })
  estabelecimento: { id: number };
}
