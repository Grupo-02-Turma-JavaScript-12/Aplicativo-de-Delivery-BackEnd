import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'tb_item_pedido' })
export class ItemPedido {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'int' })
  @ApiProperty()
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco_unitario: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.itensPedido)
  @ApiProperty({ type: () => Pedido })
  pedido: Pedido;

  @ManyToOne(() => Produto, (produto) => produto.itens)
  @ApiProperty({ type: () => Produto })
  produto: Produto;
}
