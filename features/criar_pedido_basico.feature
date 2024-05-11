# language: pt
Funcionalidade: Criação de Pedido
  Como um cliente
  Quero criar um pedido
  Para obter alimentos de um restaurante

  Cenário: Criar um pedido básico
    Dado que eu estou na página de criação de pedido
    Quando eu seleciono um lanche básico
    E eu confirmo o pedido
    Então o pedido é enviado para a equipe Fast Food
