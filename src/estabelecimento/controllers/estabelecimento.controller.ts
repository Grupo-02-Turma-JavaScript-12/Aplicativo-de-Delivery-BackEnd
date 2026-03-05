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
  UseGuards,
} from '@nestjs/common';
import { Estabelecimento } from '../entities/estabelecimento.entity';
import { EstabelecimentoService } from '../services/estabelecimento.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Estabelecimento')
@Controller('/estabelecimentos')
@ApiBearerAuth()
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

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  create(@Body() estabelecimento: Estabelecimento): Promise<Estabelecimento> {
    return this.estabelecimentoService.create(estabelecimento);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  update(@Body() estabelecimento: Estabelecimento): Promise<Estabelecimento> {
    return this.estabelecimentoService.update(estabelecimento);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.estabelecimentoService.delete(id);
  }
}
