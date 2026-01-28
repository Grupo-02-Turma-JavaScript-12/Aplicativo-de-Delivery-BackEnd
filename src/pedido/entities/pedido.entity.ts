import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estabelecimento } from '../../estabelecimento/entities/estabelecimento.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty()
  valor_total: number;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  @ApiProperty()
  status: string;

  @CreateDateColumn()
  @ApiProperty()
  data_pedido: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedido, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Usuario })
  usuario: Usuario;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.pedido,
    {
      onDelete: 'CASCADE',
    },
  )
  @ApiProperty({ type: () => Estabelecimento })
  estabelecimento: Estabelecimento;
}
