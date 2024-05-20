# language: pt
Funcionalidade: Cadastro de cliente
    Como um cliente
    Quero me cadastrar para receber promoções
    Para que eu possa comprar no restaurante

  Cenário: Cadastro de cliente com sucesso
    Dado que o cliente informou os seguintes dados
      | Nome  | Email          | CPF         |
      | Maria | maria@gmai.com | 70027656047 |
    Quando o cliente clicar em cadastrar
    Então o cliente deve ser cadastrado com sucesso
