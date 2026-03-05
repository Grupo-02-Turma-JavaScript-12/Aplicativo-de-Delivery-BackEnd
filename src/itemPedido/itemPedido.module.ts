import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPedidoService } from './service/itemPedido.service';
import { ItemPedido } from './entities/itemPedido.entity';
import { ItemPedidoController } from './controller/itemPedido.controller';
import { PedidoModule } from '../pedido/pedido.module';
import { ProdutoModule } from '../produtos/produto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemPedido]),
    PedidoModule,
    ProdutoModule,
  ],
  controllers: [ItemPedidoController],
  providers: [ItemPedidoService],
  exports: [ItemPedidoService],
})
export class itemPedidoModule {}
