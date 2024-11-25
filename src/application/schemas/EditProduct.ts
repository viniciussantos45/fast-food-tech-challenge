import { ProductCategoryEnum } from '@/shared-kernel/value-objects/ProductCategory'

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
        examples: ['Produto 1 - editado'],
        minLength: 2,
        errorMessage: {
          minLength: 'O nome do produto deve ter pelo menos 2 caracteres.'
        }
      },
      category: {
        type: 'string',
        enum: Object.values(ProductCategoryEnum),
        errorMessage: {
          type: 'O campo categoria deve ser uma string.'
        }
      },
      price: {
        type: 'number',
        examples: [10.5],
        minimum: 0.01,
        errorMessage: {
          minimum: 'O preço do produto deve ser maior que zero.'
        }
      },
      description: {
        type: 'string',
        examples: ['Descrição do produto - editado'],
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
          examples: ['https://example.com/image-editada.jpg'],
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
