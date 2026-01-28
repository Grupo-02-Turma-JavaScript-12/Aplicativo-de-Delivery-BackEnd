/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pedidos } from '../../pedidos/entities/pedido.entity';

@Entity({ name: 'tb_estabelecimento' })
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  categoria: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  taxa_entrega: number;

  @OneToMany(() => Pedidos, (pedido) => pedido.estabelecimento)
  pedido: Pedidos[];
}
