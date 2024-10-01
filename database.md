# Documentação de Modelagem de Dados - Sistema de Fast-Food

## 1. Visão Geral do Modelo

O modelo de dados apresentado representa um sistema para gerenciamento de pedidos de fast-food. Ele inclui entidades para clientes, produtos, pedidos, combos e imagens de produtos.

## 2. Entidades e Relacionamentos

### 2.1 Customer (Cliente)

- Attributes:
  - id (PK): serial
  - cpf: text (unique)
  - name: text
  - email: text (unique)
- Relationships:
  - One-to-Many com Order

### 2.2 Product (Produto)

- Attributes:
  - id (PK): serial
  - name: text
  - category: text
  - price: numeric(65,30)
  - description: text
- Relationships:
  - One-to-Many com ProductImages
  - Many-to-Many com Combo através de ComboProducts

### 2.3 ProductImages (Imagens do Produto)

- Attributes:
  - id (PK): serial
  - productId (FK): integer
  - url: text
- Relationships:
  - Many-to-One com Product

### 2.4 Order (Pedido)

- Attributes:
  - id (PK): serial
  - customer_id (FK): integer
  - created_at: timestamp(3)
  - status: text
  - status_payment: text
  - payment_gateway_id: text
- Relationships:
  - Many-to-One com Customer
  - One-to-Many com Combo

### 2.5 Combo

- Attributes:
  - id (PK): serial
  - order_id (FK): integer
- Relationships:
  - Many-to-One com Order
  - Many-to-Many com Product através de ComboProducts

### 2.6 ComboProducts

- Attributes:
  - product_id (PK, FK): integer
  - combo_id (PK, FK): integer
  - created_at: timestamp(3)
- Relationships:
  - Representa a relação Many-to-Many entre Combo e Product

## 3. Justificativa da Escolha do Banco de Dados

O modelo de dados apresentado está implementado em um banco de dados relacional, especificamente PostgreSQL. Esta escolha é justificada pelos seguintes fatores:

1. **Estrutura de Dados Relacional**: O sistema requer um modelo de dados bem estruturado com relações claras entre entidades, o que é ideal para bancos de dados relacionais.

2. **Integridade de Dados**: O PostgreSQL oferece suporte robusto para chaves primárias, chaves estrangeiras e restrições, garantindo a integridade referencial e a consistência dos dados.

3. **Transações ACID**: Para um sistema de pedidos, é crucial ter suporte a transações ACID (Atomicidade, Consistência, Isolamento, Durabilidade), que o PostgreSQL fornece.

4. **Escalabilidade**: O PostgreSQL é conhecido por seu bom desempenho e capacidade de lidar com grandes volumes de dados, o que é importante para um sistema de pedidos que pode crescer com o tempo.

5. **Recursos Avançados**: O PostgreSQL oferece recursos avançados como índices, views, stored procedures e triggers, que podem ser úteis para otimizações futuras e lógica de negócios complexa.

6. **Compatibilidade com ORM**: O uso de nomes de tabela com inicial maiúscula sugere a utilização de um ORM (possivelmente Prisma, dado o nome da tabela \_prisma_migrations). PostgreSQL tem excelente suporte para diversas ferramentas ORM.

7. **Open Source e Comunidade Ativa**: Sendo open source, o PostgreSQL tem uma comunidade ativa, documentação extensa e é constantemente atualizado com novos recursos e melhorias de segurança.

8. **Tipos de Dados Flexíveis**: O PostgreSQL suporta uma ampla variedade de tipos de dados, incluindo JSON, que pode ser útil para armazenar dados semi-estruturados no futuro.

## 4. Normalização do Modelo de Dados

O modelo de dados foi projetado seguindo os princípios de normalização, atingindo até a Terceira Forma Normal (3NF) e possivelmente a Forma Normal de Boyce-Codd (BCNF) em todas as suas tabelas. Isso garante a minimização de redundância e dependências problemáticas nos dados.

### 4.1 Primeira Forma Normal (1NF)

Todas as tabelas estão na 1NF, pois:

- Cada coluna contém valores atômicos (indivisíveis)
- Não há grupos repetitivos
- Cada tabela tem uma chave primária definida

Exemplo: A tabela "Customer" tem uma chave primária (id) e todos os seus atributos são atômicos.

### 4.2 Segunda Forma Normal (2NF)

As tabelas estão na 2NF, pois:

- Estão na 1NF
- Todos os atributos não-chave são totalmente dependentes da chave primária

Exemplo: Na tabela "Product", todos os atributos (name, category, price, description) dependem totalmente da chave primária (id).

### 4.3 Terceira Forma Normal (3NF)

As tabelas estão na 3NF, pois:

- Estão na 2NF
- Não há dependências transitivas entre os atributos não-chave

Exemplo: Na tabela "Order", não há dependências transitivas evidentes entre os atributos não-chave.

A aplicação dessas formas normais no modelo de dados contribui para:

1. Minimizar a redundância de dados
2. Garantir a integridade dos dados
3. Facilitar a manutenção e atualização do banco de dados
4. Melhorar a flexibilidade do esquema para futuras extensões

Esta estrutura normalizada proporciona uma base sólida para o sistema, permitindo um gerenciamento eficiente e consistente dos dados relacionados aos pedidos de fast-food.
