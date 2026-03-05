import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Estabelecimento } from '../../estabelecimento/entities/estabelecimento.entity';

export enum TipoUsuario {
  ADM = 'ADM',
  ESTABELECIMENTO = 'ESTABELECIMENTO',
  USUARIO = 'USUARIO',
}

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 5000, nullable: true })
  @ApiProperty()
  foto: string;

  @Column({
    type: 'enum',
    enum: TipoUsuario,
    default: TipoUsuario.USUARIO,
  })
  @ApiProperty({ enum: TipoUsuario })
  tipo: TipoUsuario;

  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  @ApiProperty()
  pedido: Pedido[];

  @OneToMany(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.usuario,
  )
  @ApiProperty()
  estabelecimento: Estabelecimento[];
}
