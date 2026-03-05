import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabelecimentoController } from './controllers/estabelecimento.controller';
import { Estabelecimento } from './entities/estabelecimento.entity';
import { EstabelecimentoService } from './services/estabelecimento.service';
import { Produto } from '../produtos/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estabelecimento]), Produto],
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService],
  exports: [EstabelecimentoService],
})
export class EstabelecimentoModule {}
