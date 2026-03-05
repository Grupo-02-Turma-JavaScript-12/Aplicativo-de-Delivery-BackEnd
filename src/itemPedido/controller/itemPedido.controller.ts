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

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ItemPedidoService } from '../service/itemPedido.service';
import { ItemPedido } from '../entities/itemPedido.entity';

@ApiTags('ItemPedido')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/itempedidos')
export class ItemPedidoController {
  constructor(private itemPedidoService: ItemPedidoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/cadastrar')
  create(@Body() itemPedido: ItemPedido) {
    return this.itemPedidoService.create(itemPedido);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ItemPedido[]> {
    return this.itemPedidoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<ItemPedido> {
    return this.itemPedidoService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.itemPedidoService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() itemPedido: ItemPedido): Promise<ItemPedido> {
    return this.itemPedidoService.update(itemPedido);
  }
}
