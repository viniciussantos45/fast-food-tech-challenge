import { ComboUseCase } from '@/core/domain/use-cases/ComboUseCase'
import { CustomerUseCase } from '@/core/domain/use-cases/CustomerUseCase'
import { OrderUseCase } from '@/core/domain/use-cases/OrderUseCase'
import { PaymentGatewayUseCase } from '@/core/domain/use-cases/PaymentGatewayUseCase'
import { ProductUseCase } from '@/core/domain/use-cases/ProductUseCase'
import { CPF } from '@/core/domain/value-objects/CPF'
import { OrderStatus } from '@/core/domain/value-objects/OrderStatus'
import { PaymentStatus, PaymentStatusMessage } from '@/core/domain/value-objects/PaymentStatus'
import { MercadoPagoPaymentGatewayFake } from '@/infra/gateways/MercadoPagoPaymentGatewayFake'
import { ComboRepositoryMemory } from '@/infra/repositories/memory/ComboRepository'
import { CustomerRepositoryMemory } from '@/infra/repositories/memory/CustomerRepository'
import { OrderRepositoryMemory } from '@/infra/repositories/memory/OrderRepository'
import { ProductRepositoryMemory } from '@/infra/repositories/memory/ProductRepository'
import { Product } from '@/shared-kernel/entities/Product'
import { ProductCategory, ProductCategoryEnum } from '@/shared-kernel/value-objects/ProductCategory'
import { ProductImage } from '@/shared-kernel/value-objects/ProductImage'

import { beforeAll, beforeEach, describe, expect, it } from 'vitest'

let orderRepositoryMemory: OrderRepositoryMemory
let comboRepositoryMemory: ComboRepositoryMemory
let productRepository: ProductRepositoryMemory
let customerRepository: CustomerRepositoryMemory

let comboUseCase: ComboUseCase
let productUseCase: ProductUseCase
let customerUseCase: CustomerUseCase
let orderUseCase: OrderUseCase
let paymentGatewayUseCase: PaymentGatewayUseCase

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

  beforeEach(() => {
    orderRepositoryMemory = new OrderRepositoryMemory()
    comboRepositoryMemory = new ComboRepositoryMemory()
    productRepository = new ProductRepositoryMemory()
    customerRepository = new CustomerRepositoryMemory()
    comboUseCase = new ComboUseCase(comboRepositoryMemory)
    productUseCase = new ProductUseCase(productRepository)
    customerUseCase = new CustomerUseCase(customerRepository)
    paymentGatewayUseCase = new PaymentGatewayUseCase(new MercadoPagoPaymentGatewayFake())
    orderUseCase = new OrderUseCase(orderRepositoryMemory, comboUseCase, productUseCase, customerUseCase, paymentGatewayUseCase)
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

  it('should be able to list all orders', async () => {
    const customer = {
      name: 'John Doe4',
      cpf: '06041772089',
      email: 'john-doe5@gmail.com'
    }

    await customerUseCase.registerCustomer(customer.cpf, customer.name, customer.email)

    const orders = [
      await orderUseCase.createOrder({
        combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
        customerId: new CPF(customer.cpf)
      }),
      await orderUseCase.createOrder({
        combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
        customerId: new CPF(customer.cpf)
      }),
      await orderUseCase.createOrder({
        combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
        customerId: new CPF(customer.cpf)
      }),
      await orderUseCase.createOrder({
        combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
        customerId: new CPF(customer.cpf)
      }),
      await orderUseCase.createOrder({
        combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
        customerId: new CPF(customer.cpf)
      }),
      await orderUseCase.createOrder({
        combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
        customerId: new CPF(customer.cpf)
      }),
      await orderUseCase.createOrder({
        combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
        customerId: new CPF(customer.cpf)
      }),
      await orderUseCase.createOrder({
        combos: [{ productsIds: products.map((product) => product.getId()) as number[] }],
        customerId: new CPF(customer.cpf)
      })
    ]

    await orderUseCase.changeOrderStatus(orders[0].id as number, OrderStatus.IN_PROGRESS)
    await orderUseCase.changeOrderStatus(orders[1].id as number, OrderStatus.IN_PROGRESS)
    await orderUseCase.changeOrderStatus(orders[2].id as number, OrderStatus.READY)
    await orderUseCase.changeOrderStatus(orders[3].id as number, OrderStatus.READY)
    await orderUseCase.changeOrderStatus(orders[4].id as number, OrderStatus.FINISHED)
    await orderUseCase.changeOrderStatus(orders[5].id as number, OrderStatus.FINISHED)

    const listOrders = await orderUseCase.listOrdersGroupedByStatus()

    expect(listOrders).toBeDefined()
    expect(listOrders.finished).toHaveLength(2)
    expect(listOrders.in_progress).toHaveLength(2)
    expect(listOrders.ready).toHaveLength(2)
    expect(listOrders.received).toHaveLength(2)
  })
})
