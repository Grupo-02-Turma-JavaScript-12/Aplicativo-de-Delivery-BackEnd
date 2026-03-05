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
import { Estabelecimento } from '../entities/estabelecimento.entity';
import { EstabelecimentoService } from '../services/estabelecimento.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { TipoUsuario } from '../../usuario/entities/usuario.entity';
import { UsuarioToken } from '../../auth/strategy/usuario-token';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADM, TipoUsuario.ESTABELECIMENTO)
  create(
    @Body() estabelecimento: Estabelecimento,
    @Req() req: Request & { user: UsuarioToken },
  ): Promise<Estabelecimento> {
    return this.estabelecimentoService.create(estabelecimento, req.user);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADM, TipoUsuario.ESTABELECIMENTO)
  update(
    @Body() estabelecimento: Estabelecimento,
    @Req() req: Request & { user: UsuarioToken },
  ): Promise<Estabelecimento> {
    return this.estabelecimentoService.update(estabelecimento, req.user);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADM, TipoUsuario.ESTABELECIMENTO)
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request & { user: UsuarioToken },
  ) {
    return this.estabelecimentoService.delete(id, req.user);
  }
}
