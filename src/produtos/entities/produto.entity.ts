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
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produto' })
export class Produto {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  foto_produto: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  descricao: string;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  preco: number;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  @ApiProperty()
  calorias: string;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  @ApiProperty()
  proteinas: string;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  @ApiProperty()
  carboritratos: string;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  @ApiProperty()
  gorduras: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto)
  @ApiProperty()
  categoria: Categoria;

  // fazer relacionamento com categoria

  @OneToMany(() => Pedido, (pedido) => pedido.estabelecimento)
  @ApiProperty()
  pedido: Pedido[];
}
