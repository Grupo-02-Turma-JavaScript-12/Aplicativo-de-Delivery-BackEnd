import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Produto } from '../entities/produto.entity';
import { TipoUsuario } from '../../usuario/entities/usuario.entity';
import { UsuarioToken } from '../../auth/strategy/usuario-token';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: { categoria: true, estabelecimento: true },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: { estabelecimento: { usuario: true }, categoria: true },
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }
    return produto;
  }

  async findByName(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { estabelecimento: { usuario: true }, categoria: true },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto, userLogado: UsuarioToken): Promise<Produto> {
    const busca = await this.findById(produto.id);

    if (
      userLogado.role !== TipoUsuario.ADM &&
      busca.estabelecimento.usuario.id !== userLogado.userId
    ) {
      throw new HttpException(
        'Você só pode atualizar produtos do seu próprio estabelecimento!',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number, userLogado: UsuarioToken): Promise<DeleteResult> {
    const busca = await this.findById(id);

    if (
      userLogado.role !== TipoUsuario.ADM &&
      busca.estabelecimento.usuario.id !== userLogado.userId
    ) {
      throw new HttpException(
        'Você só pode deletar produtos do seu próprio estabelecimento!',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.produtoRepository.delete(id);
  }
}
