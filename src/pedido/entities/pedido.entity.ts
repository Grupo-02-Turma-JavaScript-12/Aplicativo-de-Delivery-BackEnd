import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estabelecimento } from '../../estabelecimento/entities/estabelecimento.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ItemPedido } from '../../itemPedido/entities/itemPedido.entity';

@Entity({ name: 'tb_pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  @ApiProperty()
  status: string;

  @CreateDateColumn()
  @ApiProperty()
  data_pedido: Date;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty()
  valor_total: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedido, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Usuario })
  usuario: Usuario;

  @ApiProperty({ type: () => Estabelecimento })
  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.pedido,
    {
      onDelete: 'CASCADE',
    },
  )
  estabelecimento: Estabelecimento;

  @ApiProperty({ type: () => [ItemPedido] })
  @OneToMany(() => ItemPedido, (itensPedido) => itensPedido.pedido)
  itensPedido: ItemPedido[];
  @ManyToMany(() => Produto, (produto) => produto.pedidos)
  @ApiProperty()
  @JoinTable({
    name: 'tb_pedidos_produtos',
    joinColumn: { name: 'pedido_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'produto_id', referencedColumnName: 'id' },
  })
  produtos: Produto[];
}
