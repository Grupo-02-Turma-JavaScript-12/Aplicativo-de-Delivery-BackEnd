import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsNumber()
  @ApiProperty({
    example: 45.9,
    description: 'Valor total do pedido',
  })
  valor_total: number;

  @IsString()
  @ApiProperty({
    example: 'Entregue',
    description: 'Status atual do pedido',
  })
  status: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do Usuário (Cliente)',
    example: { id: 1 },
  })
  usuario: { id: number };

  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do Estabelecimento',
    example: { id: 2 },
  })
  estabelecimento: { id: number };
}
