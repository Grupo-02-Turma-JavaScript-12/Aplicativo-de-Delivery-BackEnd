import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ItemPedido } from '../entities/itemPedido.entity';
import { ProdutoService } from '../../produtos/services/produto.service';
import { PedidoService } from '../../pedido/services/pedido.service';

@Injectable()
export class ItemPedidoService {
  constructor(
    @InjectRepository(ItemPedido)
    private itemPedidoRepository: Repository<ItemPedido>,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
  ) {}

  async findAll(): Promise<ItemPedido[]> {
    return await this.itemPedidoRepository.find({
      relations: {
        pedido: true,
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<ItemPedido> {
    const itemPedido = await this.itemPedidoRepository.findOne({
      where: { id: id },
      relations: { pedido: true, produto: true },
    });
    if (!itemPedido)
      throw new HttpException('Pedido não encontrado', HttpStatus.NOT_FOUND);
    return itemPedido;
  }

  async create(itemPedido: ItemPedido): Promise<ItemPedido> {
    await this.pedidoService.findById(itemPedido.pedido.id);
    await this.produtoService.findById(itemPedido.produto.id);
    return await this.itemPedidoRepository.save(itemPedido);
  }

  async update(itemPedido: ItemPedido): Promise<ItemPedido> {
    await this.findById(itemPedido.id);
    await this.pedidoService.findById(itemPedido.pedido.id);
    await this.produtoService.findById(itemPedido.produto.id);
    return await this.itemPedidoRepository.save(itemPedido);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.itemPedidoRepository.delete(id);
  }
}
