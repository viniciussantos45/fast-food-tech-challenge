import { FastifySchema } from 'fastify'

import { Combo } from '@/core/domain/entities/Combo'
import { OrderStatus } from '@/core/domain/value-objects/OrderStatus'
import { PaymentStatus } from '@/core/domain/value-objects/PaymentStatus'

export const createOrderSchema: FastifySchema = {
  description: 'Create a new order',
  tags: ['order'],
  body: {
    type: 'object',
    required: ['customer', 'combos', 'statusPayment', 'status'],
    properties: {
      customer: { type: 'string' },
      combos: { type: Combo },
      statusPayment: { type: PaymentStatus },
      status: { type: OrderStatus }
    }
  },
  response: {
    201: {
      description: 'Order created successfully',
      type: 'object',
      properties: {
        id: { type: 'number' },
        customer: { type: 'string' },
        combos: { type: Combo },
        statusPayment: { type: PaymentStatus },
        status: { type: OrderStatus }
      }
    }
  }
}
