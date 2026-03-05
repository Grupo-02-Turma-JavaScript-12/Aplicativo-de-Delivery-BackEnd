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
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { TipoUsuario } from '../../usuario/entities/usuario.entity';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';
import { UsuarioToken } from '../../auth/strategy/usuario-token';

@ApiTags('Produto')
@Controller('/produtos')
@ApiBearerAuth()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByName(nome);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADM, TipoUsuario.ESTABELECIMENTO)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADM, TipoUsuario.ESTABELECIMENTO)
  update(
    @Body() produto: Produto,
    @Req() req: Request & { user: UsuarioToken },
  ): Promise<Produto> {
    return this.produtoService.update(produto, req.user);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADM, TipoUsuario.ESTABELECIMENTO)
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request & { user: UsuarioToken },
  ) {
    return this.produtoService.delete(id, req.user);
  }
}
