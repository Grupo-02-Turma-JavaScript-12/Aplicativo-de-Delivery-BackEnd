import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabelecimentoController } from './controllers/estabelecimento.controller';
import { Estabelecimento } from './entities/estabelecimento.entity';
import { EstabelecimentoService } from './services/estabelecimento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estabelecimento])],
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService],
})
export class EstabelecimentoModule {}
