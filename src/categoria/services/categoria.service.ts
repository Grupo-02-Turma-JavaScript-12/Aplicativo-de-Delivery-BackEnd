import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { ProdutoService } from '../../produtos/services/produto.service';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    private produtoService: ProdutoService,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: id },
      relations: { produto: true },
    });
    if (!categoria)
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    return categoria;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    // Adicionar verificação de produto id
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);

    if (categoria.produto && categoria.produto.length > 0) {
      for (const produto of categoria.produto) {
        await this.produtoService.findById(produto.id);
      }
    }

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.categoriaRepository.delete(id);
  }
}
