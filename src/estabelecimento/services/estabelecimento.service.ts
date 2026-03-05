import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Estabelecimento } from '../entities/estabelecimento.entity';
import { TipoUsuario, Usuario } from '../../usuario/entities/usuario.entity';
import { UsuarioToken } from '../../auth/strategy/usuario-token';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private estabelecimentoRepository: Repository<Estabelecimento>,
  ) {}

  async findAll(): Promise<Estabelecimento[]> {
    return await this.estabelecimentoRepository.find({
      relations: { pedido: true, usuario: true, produto: true },
    });
  }

  async findById(id: number): Promise<Estabelecimento> {
    const estabelecimento = await this.estabelecimentoRepository.findOne({
      where: { id },
      relations: { pedido: true, usuario: true, produto: true },
    });

    if (!estabelecimento) {
      throw new HttpException(
        'Estabelecimento não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }
    return estabelecimento;
  }

  async findByName(nome: string): Promise<Estabelecimento[]> {
    return await this.estabelecimentoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { pedido: true, usuario: true, produto: true },
    });
  }

  async create(
    estabelecimento: Estabelecimento,
    userLogado: UsuarioToken,
  ): Promise<Estabelecimento> {
    const dono = new Usuario();
    dono.id = userLogado.userId;
    estabelecimento.usuario = dono;

    return await this.estabelecimentoRepository.save(estabelecimento);
  }

  async update(
    estabelecimento: Estabelecimento,
    userLogado: UsuarioToken,
  ): Promise<Estabelecimento> {
    const busca = await this.findById(estabelecimento.id);

    if (
      userLogado.role !== TipoUsuario.ADM &&
      busca.usuario.id !== userLogado.userId
    ) {
      throw new HttpException(
        'Você só pode atualizar o seu próprio estabelecimento!',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.estabelecimentoRepository.save(estabelecimento);
  }

  async delete(id: number, userLogado: UsuarioToken): Promise<DeleteResult> {
    const busca = await this.findById(id);

    if (
      userLogado.role !== TipoUsuario.ADM &&
      busca.usuario.id !== userLogado.userId
    ) {
      throw new HttpException(
        'Você só pode deletar o seu próprio estabelecimento!',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.estabelecimentoRepository.delete(id);
  }
}
