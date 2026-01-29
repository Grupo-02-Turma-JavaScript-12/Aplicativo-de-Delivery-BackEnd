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

## Testes realizados no Insomnia
```
Testes realizados na Autenticação de Usuário
```
#### Login Usuário
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bf094333-793a-478c-84ae-493775b96c14" />

#### Consulta de todos os usuarios com o Token de Usuário
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a4df38b1-1af0-47d1-8111-480f6be83c85" />

---
```
Testes realizados na Entidade Usuário
```


#### Consultar todos usuários

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/27a01aae-42a6-40c9-a11a-5ff6cb070f36" />

#### Consultar Usuários por ID

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/074adb28-f7cd-4cad-9608-53f039a0118e" />

#### Atualizar Usuário

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/93feb8c3-d875-4522-80b5-bb7c911ebb86" />


#### Deletar Usuário
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b54b0c99-50e3-4af9-a728-c96116a9e44d" />


---

```
Testes realizados na Entidade Pedidos
```

#### Cadastrar Pedidos
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9788524b-be55-4c82-92f4-e6812e7cb843" />


#### Deletar Pedidos

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/816fe3a5-f153-4ed3-8136-91c528ce2bdd" />


#### Consultar todos os Pedidos

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/968851c1-3fe2-4cae-8ecb-ad4fd6f14da5" />


#### Consultar Pedidos por Id

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/20758a39-8a7b-483a-9f1f-5cd73947510c" />


#### Atualizar dados de Pedido

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f49ae3e9-9e52-41c9-b294-2eb8af07f0d3" />

---

```
Testes realizados na Entidade Estabelecimento
```

#### Cadastrar estabelecimento
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7390f532-9130-44fe-8903-2d97fa900cf9" />



#### Buscar todos estabelecimentos

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/963c381e-71e3-43d8-a2c0-bebc024905a2" />


#### Buscar Estabelecimento por Id

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e02b0dc7-11f8-4dda-9312-e2e3886f81a1" />


#### Atualizar dados dos Estabelecimentos

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cce91127-0e2d-4e62-b4df-0ed88b89a8d4" />


#### Deletar cadastro do Estabelecimento

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dac9d1ef-82dd-4f63-8b4d-1242f1133253" />


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
