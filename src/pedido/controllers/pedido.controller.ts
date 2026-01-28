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
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../entities/pedido.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Pedido')
@Controller('/pedidos')
@ApiBearerAuth()
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.pedidoService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/recomendacoes/saudaveis')
  @HttpCode(HttpStatus.OK)
  async getRecomendacoes(): Promise<Pedido[]> {
    return this.pedidoService.recomendarPedidosSaudaveis();
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() pedido: Pedido): Promise<Pedido> {
    return this.pedidoService.create(pedido);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() pedido: Pedido): Promise<Pedido> {
    return this.pedidoService.update(pedido);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.delete(id);
  }
}
