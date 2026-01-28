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

@Entity({ name: 'tb_pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor_total: number;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  status: string;

  @CreateDateColumn()
  data_pedido: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedido, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.pedido,
    {
      onDelete: 'CASCADE',
    },
  )
  estabelecimento: Estabelecimento;
}
