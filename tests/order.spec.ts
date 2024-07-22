import { ComboRepositoryMemory } from '@/adapter/driven/database/implementations/memory/ComboRepository'
import { CustomerRepositoryMemory } from '@/adapter/driven/database/implementations/memory/CustomerRepository'
import { OrderRepositoryMemory } from '@/adapter/driven/database/implementations/memory/OrderRepository'
import { ProductRepositoryMemory } from '@/adapter/driven/database/implementations/memory/ProductRepository'
import { ComboUseCase } from '@/core/domain/use-cases/ComboUseCase'
import { CustomerUseCase } from '@/core/domain/use-cases/CustomerUseCase'
import { OrderUseCase } from '@/core/domain/use-cases/OrderUseCase'
import { ProductUseCase } from '@/core/domain/use-cases/ProductUseCase'
import { CPF } from '@/core/domain/value-objects/CPF'
import { describe, expect, it } from 'vitest'

const orderRepositoryMemory = new OrderRepositoryMemory()
const comboRepositoryMemory = new ComboRepositoryMemory()
const productRepository = new ProductRepositoryMemory()
const customerRepository = new CustomerRepositoryMemory()

const comboUseCase = new ComboUseCase(comboRepositoryMemory)
const productUseCase = new ProductUseCase(productRepository)
const customerUseCase = new CustomerUseCase(customerRepository)
const orderUseCase = new OrderUseCase(orderRepositoryMemory, comboUseCase, productUseCase, customerUseCase)

describe('Order', () => {
  it('should be able to create a new order', async () => {
    const customer = {
      name: 'John Doe',
      cpf: '53888246083',
      email: 'john-doe@gmail.com'
    }

    await customerUseCase.registerCustomer(customer.cpf, customer.name, customer.email)

    const order = await orderUseCase.createOrder({
      combos: [{ productIds: [1, 2, 3] }],
      customerId: new CPF(customer.cpf)
    })

    expect(order).toBeDefined()
    expect(orderRepositoryMemory.orders).toHaveLength(1)
    expect(orderRepositoryMemory.orders[0].getCombos()).toHaveLength(1)
  })
})
