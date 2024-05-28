import { FastifyReply, FastifyRequest } from 'fastify'

import { CheckoutDto } from '../dtos/CheckoutDto'

export async function checkoutOrder(request: FastifyRequest<{ Body: CheckoutDto }>, reply: FastifyReply): Promise<void> {
  const { orderId } = request.body

  const isCheckedOut = orderId != 0 ? true : false
  if (!isCheckedOut) throw new Error('Failed to checkout order')

  reply.status(201).send(isCheckedOut)
}
