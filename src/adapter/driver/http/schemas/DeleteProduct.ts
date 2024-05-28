export const deleteProductSchema = {
  description: 'Deleta um produto pelo id',
  tags: ['produtos'],

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        errorMessage: {
          type: 'O id do produto deve ser um número.'
        }
      }
    }
  },

  response: {
    200: {
      description: 'Produto deletado com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Produto deletado com sucesso!' }
      }
    },
    404: {
      description: 'Produto não encontrado',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Produto não encontrado' }
      }
    }
  }
}
