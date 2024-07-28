import { Product } from '@/core/domain/entities/Product'
import { ComboUseCase } from '@/core/domain/use-cases/ComboUseCase'
import { CustomerUseCase } from '@/core/domain/use-cases/CustomerUseCase'
import { OrderUseCase } from '@/core/domain/use-cases/OrderUseCase'
import { ProductUseCase } from '@/core/domain/use-cases/ProductUseCase'
import { CPF } from '@/core/domain/value-objects/CPF'
import { OrderStatus } from '@/core/domain/value-objects/OrderStatus'
import { PaymentStatus, PaymentStatusMessage } from '@/core/domain/value-objects/PaymentStatus'
import { ProductCategory, ProductCategoryEnum } from '@/core/domain/value-objects/ProductCategory'
import { ProductImage } from '@/core/domain/value-objects/ProductImage'
import { ComboRepositoryMemory } from '@/infra/repositories/memory/ComboRepository'
import { CustomerRepositoryMemory } from '@/infra/repositories/memory/CustomerRepository'
import { OrderRepositoryMemory } from '@/infra/repositories/memory/OrderRepository'
import { ProductRepositoryMemory } from '@/infra/repositories/memory/ProductRepository'
import { beforeAll, describe, expect, it } from 'vitest'

const orderRepositoryMemory = new OrderRepositoryMemory()
const comboRepositoryMemory = new ComboRepositoryMemory()
const productRepository = new ProductRepositoryMemory()
const customerRepository = new CustomerRepositoryMemory()

const comboUseCase = new ComboUseCase(comboRepositoryMemory)
const productUseCase = new ProductUseCase(productRepository)
const customerUseCase = new CustomerUseCase(customerRepository)
const orderUseCase = new OrderUseCase(orderRepositoryMemory, comboUseCase, productUseCase, customerUseCase)

let products: Product[]

describe('Order', () => {
  beforeAll(() => {
    products = [
      new Product(1, 'Product 1', new ProductCategory(ProductCategoryEnum.SANDWICH), 10.99, 'Description 1', [
        new ProductImage('https://example.com/image.jpg')
      ]),
      new Product(2, 'Product 2', new ProductCategory(ProductCategoryEnum.DRINK), 5.99, 'Description 2', [
        new ProductImage('https://example.com/image.jpg')
      ]),
      new Product(3, 'Product 3', new ProductCategory(ProductCategoryEnum.ACCOMPANIMENT), 7.99, 'Description 3', [
        new ProductImage('https://example.com/image.jpg')
      ])
    ]
  })

  it('should be able to create a new order', async () => {
    const customer = {
      name: 'John Doe',
      cpf: '53888246083',
      email: 'john-doe@gmail.com'
    }

    await customerUseCase.registerCustomer(customer.cpf, customer.name, customer.email)

    const order = await orderUseCase.createOrder({
      combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
      customerId: new CPF(customer.cpf)
    })

    expect(order).toBeDefined()
    expect(orderRepositoryMemory.orders).toHaveLength(1)
    expect(orderRepositoryMemory.orders[0].getCombos()).toHaveLength(1)
    expect(order.id).not.toBeNull()
  })

  it('should be return status payment for an specific order', async () => {
    const customer = {
      name: 'John Doe2',
      cpf: '17674185079',
      email: 'john-doe2@gmail.com'
    }

    await customerUseCase.registerCustomer(customer.cpf, customer.name, customer.email)

    const order = await orderUseCase.createOrder({
      combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
      customerId: new CPF(customer.cpf)
    })

    expect(order).toBeDefined()
    expect(order.id).not.toBeNull()

    const statusPayment = await orderUseCase.getStatusPayment(order.id as number)

    expect(statusPayment).toBeDefined()
  })

  it('should be able to change payment status for an specific order', async () => {
    const customer = {
      name: 'John Doe3',
      cpf: '01973324040',
      email: 'john-doe3@gmail.com'
    }

    await customerUseCase.registerCustomer(customer.cpf, customer.name, customer.email)

    const order = await orderUseCase.createOrder({
      combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
      customerId: new CPF(customer.cpf)
    })

    expect(order).toBeDefined()
    expect(order.statusPayment).toBe(PaymentStatus.PENDING)

    await orderUseCase.changePaymentStatus(order.id as number, PaymentStatus.APPROVED)

    const statusPayment = await orderUseCase.getStatusPayment(order.id as number)

    expect(statusPayment).toBe(PaymentStatusMessage.APPROVED)
  })

  it('should be able to change status for an specific order', async () => {
    const customer = {
      name: 'John Doe3',
      cpf: '06041772089',
      email: 'john-doe4@gmail.com'
    }

    await customerUseCase.registerCustomer(customer.cpf, customer.name, customer.email)

    const order = await orderUseCase.createOrder({
      combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
      customerId: new CPF(customer.cpf)
    })

    expect(order).toBeDefined()
    expect(order.status).toBe(OrderStatus.RECEIVED)

    await orderUseCase.changeOrderStatus(order.id as number, OrderStatus.IN_PROGRESS)

    const orderUpdated = await orderUseCase.getById(order.id as number)

    expect(orderUpdated).toBeDefined()
    expect(orderUpdated.getStatus()).toBe(OrderStatus.IN_PROGRESS)
  })
})
