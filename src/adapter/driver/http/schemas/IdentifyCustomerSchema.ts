export const identifyCustomerSchema = {
  description: 'Identificar um cliente pelo CPF',
  tags: ['cliente'],
  params: {
    type: 'object',
    properties: {
      cpf: {
        type: 'string',
        description: 'CPF do cliente'
      }
    }
  },
  response: {
    200: {
      description: 'Cliente encontrado',
      type: 'object',
      properties: {
        cpf: { type: 'string', description: 'CPF do cliente' },
        name: { type: 'string', description: 'Nome do cliente' },
        email: { type: 'string', description: 'E-mail do cliente' }
      }
    },
    404: {
      description: 'Cliente não encontrado',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' }
      }
    }
  }
}
