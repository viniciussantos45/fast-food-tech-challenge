import { Combo } from '@/core/domain/entities/Combo'
import { CPF } from '@/core/domain/value-objects/CPF'
import { OrderStatus } from '@/core/domain/value-objects/OrderStatus'
import { PaymentStatus } from '@/core/domain/value-objects/PaymentStatus'
import { IOrderRepository } from '../../repositories/OrderRepository'
import { Order } from '../entities/Order'
import { ComboUseCase } from './ComboUseCase'
import { CustomerUseCase } from './CustomerUseCase'
import { PaymentGatewayUseCase } from './PaymentGatewayUseCase'
import { ProductUseCase } from './ProductUseCase'

type ComboParams = {
  productsIds: number[]
}

type CreateOrderDTO = {
  combos: ComboParams[]
  customerId: CPF
}

export class OrderUseCase {
  private orderRepository: IOrderRepository
  private comboUseCase: ComboUseCase
  private productUseCase: ProductUseCase
  private customerUseCase: CustomerUseCase
  private paymentGatewayUseCase: PaymentGatewayUseCase

  constructor(
    orderRepository: IOrderRepository,
    comboUseCase: ComboUseCase,
    productUseCase: ProductUseCase,
    customerUseCase: CustomerUseCase,
    paymentGatewayUseCase: PaymentGatewayUseCase
  ) {
    this.orderRepository = orderRepository
    this.comboUseCase = comboUseCase
    this.productUseCase = productUseCase
    this.customerUseCase = customerUseCase
    this.paymentGatewayUseCase = paymentGatewayUseCase
  }

  async createOrder({ combos, customerId }: CreateOrderDTO) {
    const createdCombos = await Promise.all(
      combos.map(async (combo) => {
        const products = await this.productUseCase.getProductsByIds(combo.productsIds)

        return new Combo(products)
      })
    )

    const customer = await this.customerUseCase.loadCustomer(customerId.getValue())

    if (!customer) {
      throw new Error('Customer not found')
    }

    // Payment should be approved by default
    const preOrder = new Order(null, customer, createdCombos, PaymentStatus.PENDING, OrderStatus.RECEIVED, new Date())

    const order = await this.orderRepository.saveOrder(preOrder)

    // Todo with payment gateway
    // const amount: number = order.getCombos().reduce((acc, combo) => {
    //   const comboPrice = combo.getProducts().reduce((acc, product) => acc + product.getPrice(), 0)
    //   return acc + comboPrice
    // }, 0)

    // await this.paymentGatewayUseCase.processPaymentQRcode({
    //   amount,
    //   description: 'Order payment',
    //   payer: {
    //     email: customer.getEmail()
    //   }
    // })

    return {
      id: order.getId(),
      customer: {
        cpf: order.getCustomer().getCpf(),
        name: order.getCustomer().getName()
      },
      combos: order.getCombos().map((combo) => {
        return {
          products: combo.getProducts().map((product) => {
            return {
              id: product.getId(),
              name: product.getName(),
              price: product.getPrice()
            }
          })
        }
      }),
      status: order.getStatus(),
      statusPayment: order.getStatusPayment(),
      createdAt: order.getCreatedAt()
    }
  }

  async listOrders() {
    const orders = await this.orderRepository.listOrders()

    return orders.map((order) => {
      return {
        id: order.getId(),
        customer: {
          cpf: order.getCustomer().getCpf(),
          name: order.getCustomer().getName()
        },
        combos: order.getCombos().map((combo) => {
          return {
            products: combo.getProducts().map((product) => {
              return {
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice()
              }
            })
          }
        }),
        status: order.getStatusMessage(),
        statusPayment: order.getPaymentStatusMessage(),
        createdAt: order.getCreatedAt()
      }
    })
  }

  async getStatusPayment(orderId: number) {
    const order = await this.orderRepository.getOrderById(orderId)

    return order.getPaymentStatusMessage()
  }

  async changePaymentStatus(orderId: number, status: PaymentStatus) {
    const order = await this.orderRepository.getOrderById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    if (status === PaymentStatus.APPROVED || status === PaymentStatus.REFUNDED || status === PaymentStatus.REJECTED) {
      order.setStatusPayment(status)
    } else {
      throw new Error('Invalid payment status')
    }

    order.setStatusPayment(status)

    await this.orderRepository.updateOrder(order)

    return order
  }

  async changeOrderStatus(orderId: number, status: OrderStatus) {
    const order = await this.orderRepository.getOrderById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.setStatus(status)

    await this.orderRepository.updateOrder(order)

    return order
  }

  async getById(orderId: number) {
    return await this.orderRepository.getOrderById(orderId)
  }

  async listOrdersGroupedByStatus() {
    return await this.orderRepository.listOrdersGroupedByStatus()
  }

  updateOrder(order: Order): Order {
    // Perform any necessary updates to the order
    // const orderUpdatedEvent = new OrderUpdated(order)
    // Emit the order updated event
    return order
  }

  confirmOrder(order: Order): Order {
    // Perform any necessary confirmation logic
    // const orderConfirmedEvent = new OrderConfirmed(order)
    // Emit the order confirmed event
    return order
  }
}
