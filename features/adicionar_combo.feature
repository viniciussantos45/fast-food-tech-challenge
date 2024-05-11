# language: pt
Funcionalidade: Adicionar Combo ao Pedido
  Como um cliente
  Quero adicionar um combo ao meu pedido
  Para desfrutar de uma refeição completa

  Cenário: Adicionar um combo ao pedido
    Dado que eu estou na página de criação de pedido
    Quando eu seleciono um combo de lanche, bebida e acompanhamento
    E eu confirmo o pedido
    Então o pedido é enviado para a equipe Fast Food
