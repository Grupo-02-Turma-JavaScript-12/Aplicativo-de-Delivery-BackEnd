import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Estabelecimento } from '../entities/estabelecimento.entity';
import { EstabelecimentoService } from '../services/estabelecimento.service';

@Controller('/estabelecimentos')
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Estabelecimento> {
    return this.estabelecimentoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('nome') nome: string): Promise<Estabelecimento[]> {
    return this.estabelecimentoService.findByName(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() esbelecimento: Estabelecimento): Promise<Estabelecimento> {
    return this.estabelecimentoService.create(esbelecimento);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() esbelecimento: Estabelecimento): Promise<Estabelecimento> {
    return this.estabelecimentoService.update(esbelecimento);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.estabelecimentoService.delete(id);
  }
}
