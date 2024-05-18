import { FastifyReply, FastifyRequest } from 'fastify'

import { CustomerRepository } from '@/adapter/driven/database/implementations/prisma'
import { CustomerService } from '@/core/application/services/CustomerService'
import { CustomerCreateDto } from '../dtos/customer.dtos'

const customerRepository = new CustomerRepository()
const customerService = new CustomerService(customerRepository)

export const registerCustomer = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
  const { cpf, name, email } = req.body as CustomerCreateDto

  customerService.registerCustomer(cpf, name, email)

  res.status(201).send()
}

export const updateCustomer = async (req: FastifyRequest, res: FastifyReply) => {
  const { cpf, name, email } = req.body as CustomerCreateDto
  customerService.updateCustomer(cpf, name, email)
  res.status(200).send()
}
