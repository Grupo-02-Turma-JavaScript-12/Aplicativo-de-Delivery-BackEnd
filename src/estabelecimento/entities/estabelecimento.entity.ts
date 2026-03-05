import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity({ name: 'tb_estabelecimentos' })
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  nome: string;

  @Column({ length: 100, nullable: false })
  @ApiProperty()
  categoria: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  foto_estabelecimento: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  endereco: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  taxa_entrega: number;

  @OneToMany(() => Produto, (produto) => produto.estabelecimento)
  @ApiProperty({ type: () => Produto })
  produto: Produto[];

  @OneToMany(() => Pedido, (pedido) => pedido.estabelecimento)
  @ApiProperty({ type: () => Pedido })
  pedido: Pedido[];
}
