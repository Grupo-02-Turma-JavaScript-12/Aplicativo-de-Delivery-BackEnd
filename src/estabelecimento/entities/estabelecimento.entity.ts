import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
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

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  categoria: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  taxa_entrega: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.estabelecimento, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Usuario })
  usuario: Usuario;

  @OneToMany(() => Produto, (produto) => produto.estabelecimento)
  @ApiProperty()
  produto: Produto[];

  @OneToMany(() => Pedido, (pedido) => pedido.estabelecimento)
  @ApiProperty()
  pedido: Pedido[];
}
