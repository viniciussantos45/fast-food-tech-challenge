import { ComboRepositoryMemory } from '@/adapter/driven/database/implementations/memory/ComboRepository'
import { CustomerRepositoryMemory } from '@/adapter/driven/database/implementations/memory/CustomerRepository'
import { OrderRepositoryMemory } from '@/adapter/driven/database/implementations/memory/OrderRepository'
import { ProductRepositoryMemory } from '@/adapter/driven/database/implementations/memory/ProductRepository'
import { ComboService } from '@/core/application/services/ComboService'
import { CustomerService } from '@/core/application/services/CustomerService'
import { OrderService } from '@/core/application/services/OrderService'
import { ProductService } from '@/core/application/services/ProductService'
import { CPF } from '@/core/domain/value-objects/CPF'
import { describe, expect, it } from 'vitest'

const orderRepositoryMemory = new OrderRepositoryMemory()
const comboRepositoryMemory = new ComboRepositoryMemory()
const productRepository = new ProductRepositoryMemory()
const customerRepository = new CustomerRepositoryMemory()

const comboService = new ComboService(comboRepositoryMemory)
const productService = new ProductService(productRepository)
const customerService = new CustomerService(customerRepository)
const orderService = new OrderService(orderRepositoryMemory, comboService, productService, customerService)

describe('Order', () => {
  it('should be able to create a new order', async () => {
    const customer = {
      name: 'John Doe',
      cpf: '53888246083',
      email: 'john-doe@gmail.com'
    }

    await customerService.registerCustomer(customer.cpf, customer.name, customer.email)

    const order = await orderService.createOrder({
      combos: [{ productIds: [1, 2, 3] }],
      customerId: new CPF(customer.cpf)
    })

    expect(order).toBeDefined()
    expect(orderRepositoryMemory.orders).toHaveLength(1)
    expect(orderRepositoryMemory.orders[0].getCombos()).toHaveLength(1)
  })
})
