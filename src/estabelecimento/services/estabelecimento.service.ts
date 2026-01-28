import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Estabelecimento } from '../entities/estabelecimento.entity';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private estabelecimentoRepository: Repository<Estabelecimento>,
  ) {}

  async findAll(): Promise<Estabelecimento[]> {
    return await this.estabelecimentoRepository.find({
      relations: { pedido: true },
    });
  }

  async findById(id: number): Promise<Estabelecimento> {
    const estabelecimento = await this.estabelecimentoRepository.findOne({
      where: {
        id,
      },
      relations: { pedido: true },
    });

    if (!estabelecimento) {
      throw new HttpException(
        'Estabelecimento não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }

    return estabelecimento;
  }

  async findByName(nome): Promise<Estabelecimento[]> {
    return await this.estabelecimentoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: { pedido: true },
    });
  }

  async create(estabelecimento: Estabelecimento): Promise<Estabelecimento> {
    return await this.estabelecimentoRepository.save(estabelecimento);
  }

  async update(estabelecimento: Estabelecimento): Promise<Estabelecimento> {
    await this.findById(estabelecimento.id);

    return await this.estabelecimentoRepository.save(estabelecimento);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.estabelecimentoRepository.delete(id);
  }
}
