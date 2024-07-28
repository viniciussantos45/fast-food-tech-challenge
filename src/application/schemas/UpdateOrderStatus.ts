import { OrderStatus } from '@/core/domain/value-objects/OrderStatus'

export const updateOrderStatusSchema = {
  description: 'Atualiza o status de um pedido',
  tags: ['pedido'],
  params: {
    type: 'object',
    properties: {
      orderId: {
        type: 'string',
        description: 'ID do pedido'
      }
    }
  },
  body: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'Status do pedido',
        enum: Object.values(OrderStatus)
      }
    }
  }
}
