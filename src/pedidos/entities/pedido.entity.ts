import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../Usuario/entities/usuario.entity';
import { Estabelecimento } from '../../estabelecimento/entities/estabelecimento.entity';

@Entity({ name: 'tb_pedidos' })
export class Pedidos {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor_total: number;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  status: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedido)
  usuario: Usuario[];

  @ManyToOne(() => Estabelecimento, (estabelecimento) => estabelecimento.pedido)
  estabelecimento: Estabelecimento[];
}
