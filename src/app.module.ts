import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { PedidoModule } from './pedido/pedido.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Pedido } from './pedido/entities/pedido.entity';
import { Estabelecimento } from './estabelecimento/entities/estabelecimento.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_delivery',
      entities: [Usuario, Pedido, Estabelecimento],
      synchronize: true,
    }),
    UsuarioModule,
    PedidoModule,
    EstabelecimentoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
