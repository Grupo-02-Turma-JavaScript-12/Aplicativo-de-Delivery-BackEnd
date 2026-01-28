import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, MoreThan, Repository } from 'typeorm';
import { EstabelecimentoService } from '../../estabelecimento/services/estabelecimento.service';
import { Pedido } from '../entities/pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private estabelecimentoService: EstabelecimentoService,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      relations: {
        usuario: true,
        estabelecimento: true,
      },
      order: {
        data_pedido: 'DESC',
      },
    });
  }

  async recomendarPedidosSaudaveis(): Promise<Pedido[]> {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 30);

    const pedidosRecentes = await this.pedidoRepository.find({
      where: {
        data_pedido: MoreThan(dataLimite),
      },
      relations: {
        estabelecimento: true,
        usuario: true,
      },
      order: {
        data_pedido: 'DESC',
      },
    });

    const termosSaudaveis = [
      'fit',
      'saudavel',
      'saudável',
      'natural',
      'vegano',
      'vegetariano',
      'salada',
    ];

    const recomendacoes = pedidosRecentes.filter((pedido) => {
      if (pedido.estabelecimento && pedido.estabelecimento.categoria) {
        const categoriaLoja = pedido.estabelecimento.categoria.toLowerCase();

        return termosSaudaveis.some((termo) => categoriaLoja.includes(termo));
      }
      return false;
    });

    if (recomendacoes.length === 0) {
      throw new HttpException(
        'Nenhum pedido saudável recente encontrado para recomendar.',
        HttpStatus.NO_CONTENT,
      );
    }

    return recomendacoes;
  }

  async findById(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: id },
      relations: { usuario: true, estabelecimento: true },
    });
    if (!pedido)
      throw new HttpException('Pedido não encontrado', HttpStatus.NOT_FOUND);
    return pedido;
  }

  async create(pedido: Pedido): Promise<Pedido> {
    await this.estabelecimentoService.findById(pedido.estabelecimento.id);
    return await this.pedidoRepository.save(pedido);
  }

  async update(pedido: Pedido): Promise<Pedido> {
    await this.findById(pedido.id);
    await this.estabelecimentoService.findById(pedido.estabelecimento.id);
    return await this.pedidoRepository.save(pedido);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.pedidoRepository.delete(id);
  }

  async findByStatus(status: string): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      where: { status: ILike(`%${status}%`) },
      relations: { usuario: true, estabelecimento: true },
    });
  }
}
