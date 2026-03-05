import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Estabelecimento } from '../../estabelecimento/entities/estabelecimento.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { ItemPedido } from '../../itemPedido/entities/itemPedido.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_delivery',
      entities: [
        Usuario,
        Pedido,
        Estabelecimento,
        Produto,
        Categoria,
        ItemPedido,
      ],
      synchronize: true,
    };
  }
}
