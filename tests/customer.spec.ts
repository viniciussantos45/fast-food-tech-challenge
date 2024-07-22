import { beforeAll, describe, expect, it } from 'vitest'

import { CustomerRepositoryMemory } from '@/adapter/driven/database/implementations/memory/CustomerRepository'
import { CustomerUseCase } from '@/core/domain/use-cases/CustomerUseCase'

let customerRepositoryMemory: CustomerRepositoryMemory
let customerUseCase: CustomerUseCase

describe('Customer', () => {
  beforeAll(() => {
    customerRepositoryMemory = new CustomerRepositoryMemory()
    customerUseCase = new CustomerUseCase(customerRepositoryMemory)
  })

  it('should be able to create a new customer', async () => {
    const customer = {
      name: 'John Doe',
      cpf: '53888246083',
      email: 'john-doe@gmail.com'
    }

    await customerUseCase.registerCustomer(customer.cpf, customer.name, customer.email)

    const customerRegistered = await customerRepositoryMemory.getCustomerById(customer.cpf)

    expect(customerRegistered).not.toBeUndefined()

    expect(customerRepositoryMemory.customers).toHaveLength(1)
  })

  it('should not be able to create a customer case already exists', async () => {
    const customer = {
      name: 'John Doe',
      cpf: '53888246083',
      email: 'john-doe@gmail.com'
    }

    await expect(customerUseCase.registerCustomer(customer.cpf, customer.name, customer.email)).rejects.toThrowError(
      'Customer already exists'
    )
  })

  it('should not be able to create a new customer with an wrong CPF', async () => {
    const customer = {
      name: 'John Doe',
      cpf: '12345678910',
      email: 'john-doe@gmail.com'
    }

    await expect(customerUseCase.registerCustomer(customer.cpf, customer.name, customer.email)).rejects.toThrowError(
      'Invalid CPF'
    )
  })
})
