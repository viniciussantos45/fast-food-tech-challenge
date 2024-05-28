import { FastifyReply, FastifyRequest } from 'fastify'

import { CustomerRepository } from '@/adapter/driven/database/implementations/prisma'
import { ComboRepository } from '@/adapter/driven/database/implementations/prisma/ComboRepository'
import { OrderRepository } from '@/adapter/driven/database/implementations/prisma/OrderRepository'
import { ProductRepository } from '@/adapter/driven/database/implementations/prisma/ProductRepository'
import { ComboService } from '@/core/application/services/ComboService'
import { CustomerService } from '@/core/application/services/CustomerService'
import { OrderService } from '@/core/application/services/OrderService'
import { ProductService } from '@/core/application/services/ProductService'
import { CPF } from '@/core/domain/value-objects/CPF'
import { OrderCreateDto } from '../dtos/OrderDto'

const comboRepository = new ComboRepository()
const comboService = new ComboService(comboRepository)

const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)

const customerRepository = new CustomerRepository()
const customerService = new CustomerService(customerRepository)

const orderRepository = new OrderRepository()
const orderService = new OrderService(orderRepository, comboService, productService, customerService)

export async function createOrder(request: FastifyRequest<{ Body: OrderCreateDto }>, reply: FastifyReply): Promise<void> {
  const { customerId, combos } = request.body

  const cpf = new CPF(customerId)

  const order = await orderService.createOrder({ customerId: cpf, combos })

  reply.status(201).send(order)
}
