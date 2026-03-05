import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';
import { Categoria } from './entities/categoria.entity';
import { CategoriaService } from './services/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), EstabelecimentoModule],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [CategoriaService],
})
export class PedidoModule {}
