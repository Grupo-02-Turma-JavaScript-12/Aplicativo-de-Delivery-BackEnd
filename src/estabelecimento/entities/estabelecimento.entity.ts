import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_estabelecimentos' })
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  categoria: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  taxa_entrega: number;

  @OneToMany(() => Pedido, (pedido) => pedido.estabelecimento)
  @ApiProperty({ type: () => Pedido })
  pedido: Pedido[];
}
