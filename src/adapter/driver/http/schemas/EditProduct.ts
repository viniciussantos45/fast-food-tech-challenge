export const editProductSchema = {
  description: 'Editar um produto pelo id',
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
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        errorMessage: {
          minLength: 'O nome do produto deve ter pelo menos 2 caracteres.'
        }
      },
      category: {
        type: 'string',
        errorMessage: {
          type: 'O campo categoria deve ser uma string.'
        }
      },
      price: {
        type: 'number',
        minimum: 0.01,
        errorMessage: {
          minimum: 'O preço do produto deve ser maior que zero.'
        }
      },
      description: {
        type: 'string',
        minLength: 10,
        errorMessage: {
          minLength: 'A descrição deve ter pelo menos 10 caracteres.'
        }
      },
      imagesUrl: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          format: 'uri',
          errorMessage: {
            format: 'Cada imagem deve ser uma URL válida.'
          }
        },
        errorMessage: {
          minItems: 'Deve haver pelo menos uma imagem do produto.'
        }
      }
    }
  }
}
