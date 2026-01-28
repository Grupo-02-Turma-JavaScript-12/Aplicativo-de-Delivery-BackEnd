/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let app: INestApplication;
  let token: any;
  let usuarioId: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Cadastrar Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Teste Usuário',
        usuario: 'teste@usuario.com',
        senha: '12345678',
        foto: 'https://i.imgur.com/FETvs2O.png',
      })
      .expect(201);
    usuarioId = resposta.body.id;
  });

  it('02 - Não cadastrar usuário duplicado', async () => {
    return await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Teste Usuário',
        usuario: 'teste@usuario.com',
        senha: '12345678',
        foto: 'https://i.imgur.com/FETvs2O.png',
      })
      .expect(400);
  });

  it('03 - Autenticar Usuário (login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'teste@usuario.com',
        senha: '12345678',
      })
      .expect(200);

    token = resposta.body.token;
  });

  it('04 - Listar todos os Usuários', async () => {
    return await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .expect(200);
  });

  it('05 - Atualizar Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Teste Usuário Atualizado',
        usuario: 'teste@usuario.com',
        senha: '12345678',
        foto: 'https://i.imgur.com/FETvs2O.png',
      })
      .expect(200);

    expect(resposta.body.mensagem).toEqual('usuario atualizado');
  });
});
