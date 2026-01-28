import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';
import { PedidoController } from './controllers/pedido.controller';
import { Pedido } from './entities/pedido.entity';
import { PedidoService } from './services/pedido.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido]), EstabelecimentoModule],
  providers: [PedidoService],
  controllers: [PedidoController],
  exports: [PedidoService],
})
export class PedidoModule {}
