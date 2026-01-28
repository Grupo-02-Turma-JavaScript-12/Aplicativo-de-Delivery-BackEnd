<p align="center">
<img alig src="https://raw.githubusercontent.com/Grupo-02-Turma-JavaScript-12/Aplicativo-de-Delivery-BackEnd/refs/heads/main/src/assets/nutrigo%20.png" width="300" alt="MeLeva Logo" />
</p>

# NutriGo - Saúde que chega até você

No NutriGo, acreditamos que comer bem não precisa ser complicado. Nosso objetivo é tornar a vida das pessoas mais leve e saudável, entregando refeições que cuidam do corpo e também da mente. Queremos ser aquele apoio diário que lembra você de que merece se sentir bem, mesmo na correria.
Mais do que um delivery, somos uma ponte entre o desejo de viver melhor e a praticidade de ter saúde chegando até sua porta.

<br>

## Funcionalidades Técnicas da API
 
### 👤 UsuarioService
Serviço responsável por gerenciar as operações relacionadas aos usuários.

- **findByUsuario(usuario)** → Busca um usuário pelo login/email.  
  - Inclui relação com pedidos.  
- **findAll()** → Retorna todos os usuários cadastrados.  
  - Inclui relação com pedidos.  
- **findById(id)** → Busca um usuário específico pelo ID.  
  - Retorna erro `404 - Usuário não encontrado!` caso não exista.  
- **create(usuario)** → Cria um novo usuário.  
  - Retorna erro `400 - O Usuário já existe!` caso o login/email esteja duplicado.  
  - A senha é criptografada antes de salvar.  
- **update(usuario)** → Atualiza um usuário existente.  
  - Valida se o email/login não está duplicado em outro registro.  
  - A senha é criptografada novamente.  
- **delete(id)** → Remove um usuário pelo ID.  
  - Retorna erro `404 - Usuário não encontrado!` caso não exista.  

<br>


### 📦 PedidoService
Serviço responsável por gerenciar as operações relacionadas aos pedidos.

- **findAll()** → Retorna todos os pedidos cadastrados.  
  - Inclui relações com usuário e estabelecimento.  
  - Ordena por `data_pedido` em ordem decrescente.  
- **recomendarPedidosSaudaveis()** → Retorna recomendações de pedidos saudáveis feitos nos últimos 30 dias.  
  - Filtra categorias com termos como: *fit, saudável, natural, vegano, vegetariano, salada*.  
  - Retorna erro `204 - Nenhum pedido saudável recente encontrado` caso não haja resultados.  
- **findById(id)** → Busca um pedido específico pelo ID.  
  - Retorna erro `404 - Pedido não encontrado` caso não exista.  
- **create(pedido)** → Cria um novo pedido.  
- **update(pedido)** → Atualiza um pedido existente (com validação prévia).  
- **delete(id)** → Remove um pedido pelo ID.  
  - Retorna erro `404 - Pedido não encontrado` caso não exista.  
- **findByStatus(status)** → Pesquisa pedidos pelo status, com suporte a filtros (`ILike`).  
  - Inclui relações com usuário e estabelecimento.  

---

### 🏬 EstabelecimentoService
Serviço responsável por gerenciar as operações relacionadas aos estabelecimentos.

- **findAll()** → Retorna todos os estabelecimentos cadastrados.  
  - Inclui relação com pedidos.  
- **findById(id)** → Busca um estabelecimento específico pelo ID.  
  - Retorna erro `404 - Estabelecimento não encontrado!` caso não exista.  
- **findByName(nome)** → Pesquisa estabelecimentos pelo nome, com suporte a filtros (`ILike`).  
  - Inclui relação com pedidos.  
- **create(estabelecimento)** → Cria um novo estabelecimento.  
- **update(estabelecimento)** → Atualiza um estabelecimento existente (com validação prévia).  
- **delete(id)** → Remove um estabelecimento pelo ID.  
  - Retorna erro `404 - Estabelecimento não encontrado!` caso não exista.  


### 🔒 Tratamento de Erros

- Utilização de `HttpException` e `HttpStatus` para respostas padronizadas.
- Validações garantem consistência dos dados (ex.: email único, status válido, integridade relacional).



<br>

## Entidade e Atributos da Entidade

<!-- Tabela Usuario -->

### Entidade Usuários

<table border="1">
  <tr>
    <th>Coluna</th>
    <th>Tipo</th>
    <th>Restrições</th>
  </tr>
  <tr>
    <td>id</td>
    <td>int (PK)</td>
    <td>auto increment</td>
  </tr>
  <tr>
    <td>nome</td>
    <td>varchar(255)</td>
    <td>NOT NULL</td>
  </tr>
  <tr>
    <td>usuario (email)</td>
    <td>varchar(255)</td>
    <td>NOT NULL, UNIQUE</td>
  </tr>
  <tr>
    <td>senha</td>
    <td>varchar(255)</td>
    <td>NOT NULL, min length 8</td>
  </tr>
  <tr>
    <td>foto</td>
    <td>varchar(5000)</td>
    <td>NULL</td>
  </tr>
</table>

<!-- Tabela Pedidos -->

### Entidade Pedidos

<table border="1"> 
  <tr>
    <th>Coluna</th>
    <th>Tipo</th>
    <th>Restrições</th>
  </tr>
  <tr>
    <td>id</td>
    <td>int (PK)</td>
    <td>auto increment</td>
  </tr>
  <tr>
    <td>valor_total</td>
    <td>decimal(10,2)</td>
    <td>NOT NULL</td>
  </tr>
  <tr>
    <td>status</td>
    <td>varchar(30)</td>
    <td>NOT NULL</td>
  </tr>
  <tr>
    <td>data_pedido</td>
    <td>datetime</td>
    <td>auto generated</td>
  </tr>
  <tr>
    <td>usuario_id</td>
    <td>int (FK)</td>
    <td>REFERENCES tb_usuarios(id) ON DELETE CASCADE</td>
  </tr>
  <tr>
    <td>estabelecimento_id</td>
    <td>int (FK)</td>
    <td>REFERENCES tb_estabelecimentos(id) ON DELETE CASCADE</td>
  </tr>
</table>

<!-- Tabela Estabelecimento -->

### Entidade Estabelecimento

<table border="1">
    <tr>
    <th>Coluna</th>
    <th>Tipo</th>
    <th>Restrições</th>
  </tr>
  <tr>
    <td>id</td>
    <td>int (PK)</td>
    <td>auto increment</td>
  </tr>
  <tr>
    <td>nome</td>
    <td>varchar(100)</td>
    <td>NOT NULL</td>
  </tr>
  <tr>
    <td>categoria</td>
    <td>varchar(100)</td>
    <td>NOT NULL</td>
  </tr>
  <tr>
    <td>taxa_entrega</td>
    <td>decimal(10,2)</td>
    <td>NOT NULL</td>
  </tr>
</table>

## Funcionalidades no Swagger

```
Testes realizados na Entidade Usuário
```

#### Consultar todos usuários

<img width="1919" height="982" alt="image" src="https://github.com/user-attachments/assets/c5ad1834-4e58-46c3-b893-06f5b10c3371" />

#### Consultar Usuários por ID

<img width="1919" height="985" alt="image" src="https://github.com/user-attachments/assets/d522c30b-cb8c-4019-9201-c1b3d3d33ad3" />

#### Cadastrar Usuário

<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/65b08df3-3c18-490f-9417-3db453865702" />

#### Atualizar Usuário

<img width="1919" height="986" alt="image" src="https://github.com/user-attachments/assets/ddfb7a4c-4596-46de-85b5-f282f8944b98" />

#### Deletar Usuário

<img width="1919" height="987" alt="image" src="https://github.com/user-attachments/assets/47541c60-5693-41fb-bd7a-5f32468f3993" /><br>

---

```
Testes realizados na Entidade Pedidos
```

#### Consultar Caronas

<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/b7fcaacf-d226-45d6-bfc4-84a6df709662" />

#### Consultar Caronas por ID

<img width="1919" height="981" alt="image" src="https://github.com/user-attachments/assets/c9e3f856-f9cf-45ac-9b93-f963cefd4c35" />

#### Consultar caronas por Destino

<img width="1919" height="983" alt="image" src="https://github.com/user-attachments/assets/5ea2ce32-e58c-409a-a683-184455ecc953" />

#### Calcular Tempo de Viagem

<img width="1919" height="980" alt="image" src="https://github.com/user-attachments/assets/82209434-e2ca-414e-ae1a-b59e5bd1a56e" />

#### Cadastrar Carona

<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/1eb92b47-6d3d-4c27-a41b-31bf75db724c" />

#### Deletar Carona

<img width="1919" height="981" alt="image" src="https://github.com/user-attachments/assets/ee51e321-cfd7-4d93-aaf1-fef0f0b9fcd5" /><br>

---

```
Testes realizados na Entidade Estabelecimento
```

#### Consultar todas as Reservas

<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/644293bd-de79-4ff4-9815-aa8b6cdf4115" />

#### Cadastrar Reservas

<img width="1919" height="985" alt="image" src="https://github.com/user-attachments/assets/274a90b5-d21b-4a76-8916-0866b4f8ea34" />

#### Consultar Reservas por ID

<img width="1919" height="983" alt="image" src="https://github.com/user-attachments/assets/7a16f489-a1a5-441c-b87c-9ec470d3be1d" />

#### Atualizar Reservas

<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/e836e9d1-6440-4a55-935f-41c92d01c7e6" />

#### Deletar Reservas

<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/9337d907-9353-4cdf-abd6-948239c0a47d" />

## Instalação do Projeto

```bash
$ npm install
```

## Compilação do projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Autores do Projeto

- [Allyson Gonçalves](https://github.com/allysonaggp)
- [Alexandre Julio](https://github.com/AlexandreJulioDev)
- [Juliermes Mendes](https://github.com/juliomendes160)
- [Marcos Ribeiro](https://github.com/Marcsfic98)
- [Matheus Carvalho](https://github.com/mc4rvalho)
- [Matheus Lins](https://github.com/Matheus-Lins)

## Licença

MeLeva is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
