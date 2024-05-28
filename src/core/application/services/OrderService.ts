import { Combo } from '@/core/domain/entities/Combo'
import { CPF } from '@/core/domain/value-objects/CPF'
import { OrderStatus } from '@/core/domain/value-objects/OrderStatus'
import { PaymentStatus } from '@/core/domain/value-objects/PaymentStatus'
import { Order } from '../../domain/entities/Order'
import { IOrderRepository } from '../ports/OrderRepository'
import { ComboService } from './ComboService'
import { CustomerService } from './CustomerService'
import { ProductService } from './ProductService'

type ComboParams = {
  productsIds: number[]
}

type CreateOrderDTO = {
  combos: ComboParams[]
  customerId: CPF
}

export class OrderService {
  private orderRepository: IOrderRepository
  private comboService: ComboService
  private productService: ProductService
  private customerService: CustomerService

  constructor(
    orderRepository: IOrderRepository,
    comboService: ComboService,
    productService: ProductService,
    customerService: CustomerService
  ) {
    this.orderRepository = orderRepository
    this.comboService = comboService
    this.productService = productService
    this.customerService = customerService
  }

  async createOrder({ combos, customerId }: CreateOrderDTO) {
    const createdCombos = await Promise.all(
      combos.map(async (combo) => {
        const products = await this.productService.getProductsByIds(combo.productsIds)

        return new Combo(products)
      })
    )

    const customer = await this.customerService.loadCustomer(customerId.getValue())

    if (!customer) {
      throw new Error('Customer not found')
    }

    // Payment should be approved by default
    const preOrder = new Order(null, customer, createdCombos, PaymentStatus.APPROVED, OrderStatus.RECEIVED, new Date())

    const order = await this.orderRepository.saveOrder(preOrder)

    // // Perform any additional logic or validations here
    // const orderCreatedEvent = new OrderCreated(order)
    // Emit the order created event

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
