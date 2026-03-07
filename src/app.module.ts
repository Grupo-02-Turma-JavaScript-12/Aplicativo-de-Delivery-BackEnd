import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { PedidoModule } from './pedido/pedido.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DevService } from './data/services/dev.service';
import { ProdutoModule } from './produtos/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { itemPedidoModule } from './itemPedido/itemPedido.module';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    UsuarioModule,
    PedidoModule,
    EstabelecimentoModule,
    AuthModule,
    ProdutoModule,
    CategoriaModule,
    itemPedidoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
