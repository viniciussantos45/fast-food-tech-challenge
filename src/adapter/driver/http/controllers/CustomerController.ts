import { FastifyReply, FastifyRequest } from 'fastify'

import { CustomerRepository } from '@/adapter/driven/database/implementations/prisma'
import { CustomerService } from '@/core/application/services/CustomerService'
import { CustomerCreateDto } from '../dtos/CustomerDtos'

const customerRepository = new CustomerRepository()
const customerService = new CustomerService(customerRepository)

export async function registerCustomer(request: FastifyRequest<{ Body: CustomerCreateDto }>, reply: FastifyReply): Promise<void> {
  const { cpf, name, email } = request.body

  await customerService.registerCustomer(cpf, name, email)

  reply.status(201).send()
}

export async function identifyCustomer(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
  const { cpf } = request.params

  const customer = await customerService.identifyCustomer(cpf)

  if (!customer) {
    reply.status(404).send({ message: 'Customer not found' })
    return
  }

  reply.status(200).send(customer)
}

export async function updateCustomer(request: FastifyRequest<{ Body: CustomerCreateDto }>, reply: FastifyReply) {
  const { cpf, name, email } = request.body

  await customerService.updateCustomer(cpf, name, email)

  reply.status(200).send()
}
