export const listOrdersSchema = {
  description: 'Lista todos os pedidos',
  tags: ['pedido'],
  response: {
    200: {
      type: 'array',

      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          customer: {
            type: 'object',
            properties: {
              cpf: { type: 'string' },
              name: { type: 'string' }
            }
          },
          combos: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                products: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      name: { type: 'string' },
                      price: { type: 'number' }
                    }
                  }
                }
              }
            }
          },
          status: { type: 'string' },
          statusPayment: { type: 'string' },
          createdAt: { type: 'string' }
        }
      }
    }
  }
}
