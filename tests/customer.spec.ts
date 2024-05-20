import { describe, expect, it } from 'vitest'

import { CustomerRepositoryMemory } from '@/adapter/driven/database/implementations/memory/CustomerRepository'
import { CustomerService } from '@/core/application/services/CustomerService'

const customerRepositoryMemory = new CustomerRepositoryMemory()
const customerService = new CustomerService(customerRepositoryMemory)

describe('Customer', () => {
  it('should be able to create a new customer', () => {
    const customer = {
      name: 'John Doe',
      cpf: '53888246083',
      email: 'john-doe@gmail.com'
    }

    customerService.registerCustomer(customer.cpf, customer.name, customer.email)

    const customerRegistered = customerRepositoryMemory.getCustomerById(customer.cpf)

    expect(customerRegistered).not.toBeUndefined()

    expect(customerRepositoryMemory.customers).toHaveLength(1)
  })

  it('should not be able to create a new customer with an wrong CPF', () => {
    const customer = {
      name: 'John Doe',
      cpf: '12345678910',
      email: 'john-doe@gmail.com'
    }

    expect(() => {
      customerService.registerCustomer(customer.cpf, customer.name, customer.email)
    }).toThrowError('Invalid CPF')
  })
})
