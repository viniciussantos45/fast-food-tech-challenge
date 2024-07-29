import { FastifyReply, FastifyRequest } from 'fastify'

import { ComboUseCase } from '@/core/domain/use-cases/ComboUseCase'
import { CustomerUseCase } from '@/core/domain/use-cases/CustomerUseCase'
import { OrderUseCase } from '@/core/domain/use-cases/OrderUseCase'
import { ProductUseCase } from '@/core/domain/use-cases/ProductUseCase'
import { CPF } from '@/core/domain/value-objects/CPF'
import { OrderStatus } from '@/core/domain/value-objects/OrderStatus'
import { PaymentStatus } from '@/core/domain/value-objects/PaymentStatus'
import { CustomerRepository } from '@/infra/repositories/prisma'
import { ComboRepository } from '@/infra/repositories/prisma/ComboRepository'
import { OrderRepository } from '@/infra/repositories/prisma/OrderRepository'
import { ProductRepository } from '@/infra/repositories/prisma/ProductRepository'
import { OrderCreateDto } from '../dtos/OrderDto'

const comboRepository = new ComboRepository()
const comboUseCase = new ComboUseCase(comboRepository)

const productRepository = new ProductRepository()
const productUseCase = new ProductUseCase(productRepository)

const customerRepository = new CustomerRepository()
const customerUseCase = new CustomerUseCase(customerRepository)

const orderRepository = new OrderRepository()
const orderUseCase = new OrderUseCase(orderRepository, comboUseCase, productUseCase, customerUseCase)

export async function createOrder(request: FastifyRequest<{ Body: OrderCreateDto }>, reply: FastifyReply): Promise<void> {
  const { customerId, combos } = request.body

  const cpf = new CPF(customerId)

  const order = await orderUseCase.createOrder({ customerId: cpf, combos })

  reply.status(201).send(order)
}

export async function listOrders(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const orders = await orderUseCase.listOrdersGroupedByStatus()

  reply.status(200).send(orders)
}

export async function statusPayment(
  request: FastifyRequest<{ Params: { orderId: string } }>,
  reply: FastifyReply
): Promise<void> {
  const { orderId } = request.params

  const statusPayment = await orderUseCase.getStatusPayment(Number(orderId))

  reply.status(200).send(statusPayment)
}

export async function updateOrderStatus(
  request: FastifyRequest<{ Params: { orderId: string }; Body: { status: OrderStatus } }>,
  reply: FastifyReply
): Promise<void> {
  const { orderId } = request.params
  const { status } = request.body

  await orderUseCase.changeOrderStatus(Number(orderId), status)

  reply.status(204).send()
}

export async function webhookPaymentStatus(
  request: FastifyRequest<{ Body: { orderId: string; status: PaymentStatus } }>,
  reply: FastifyReply
): Promise<void> {
  const { orderId, status } = request.body

  if (status === PaymentStatus.APPROVED) {
    await orderUseCase.changePaymentStatus(Number(orderId), PaymentStatus.APPROVED)
  }

  reply.status(204).send()
}
