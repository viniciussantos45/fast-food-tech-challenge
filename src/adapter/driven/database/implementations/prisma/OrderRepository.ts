import { IOrderRepository } from '@/core/application/ports/OrderRepository'
import { Combo } from '@/core/domain/entities/Combo'
import { Customer } from '@/core/domain/entities/Customer'
import { Order } from '@/core/domain/entities/Order'
import { Product } from '@/core/domain/entities/Product'
import { CPF } from '@/core/domain/value-objects/CPF'
import { OrderStatus } from '@/core/domain/value-objects/OrderStatus'
import { PaymentStatus } from '@/core/domain/value-objects/PaymentStatus'
import { ProductCategory } from '@/core/domain/value-objects/ProductCategory'
import { ProductImage } from '@/core/domain/value-objects/ProductImage'
import { PrismaClient } from '@prisma/client'

export class OrderRepository implements IOrderRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async saveOrder(order: Order): Promise<Order> {
    const createdOrder = await this.prisma.order.create({
      data: {
        customer: {
          connect: {
            cpf: order.getCustomer().getCpf()
          }
        },
        combos: {
          create: order.getCombos().map((combo) => ({
            comboProducts: {
              create: combo.getProductsIds().map((productId) => ({
                product: {
                  connect: {
                    id: productId
                  }
                }
              }))
            }
          }))
        },
        status: order.getStatus(),
        statusPayment: order.getStatusPayment()
      }
    })

    return new Order(
      createdOrder.id,
      order.getCustomer(),
      order.getCombos(),
      order.getStatusPayment(),
      order.getStatus(),
      order.getCreatedAt()
    )
  }

  async getOrderById(orderId: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId
      },
      include: {
        customer: true,
        combos: {
          include: {
            comboProducts: {
              include: {
                product: {
                  include: {
                    images: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!order) {
      throw new Error('Order not found')
    }

    const customer = new Customer(new CPF(order.customer.cpf), order.customer.name, order.customer.email)
    const combos = order.combos.map((combo) => {
      return new Combo(
        combo.comboProducts.map(
          (comboProduct) =>
            new Product(
              comboProduct.product.id,
              comboProduct.product.name,
              new ProductCategory(comboProduct.product.category),
              comboProduct.product.price.toNumber(),
              comboProduct.product.description,
              comboProduct.product.images.map((image) => new ProductImage(image.url))
            )
        )
      )
    })
    const paymentStatus = order.statusPayment as PaymentStatus
    const orderStatus = order.status as OrderStatus

    return new Order(order.id, customer, combos, paymentStatus, orderStatus, order.createdAt)
  }

  async removeOrder(orderId: number): Promise<void> {
    await this.prisma.order.delete({
      where: {
        id: orderId
      }
    })
  }

  async listOrders(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        customer: true,
        combos: {
          include: {
            comboProducts: {
              include: {
                product: {
                  include: {
                    images: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return orders.map((order) => {
      const customer = new Customer(new CPF(order.customer.cpf), order.customer.name, order.customer.email)
      const combos = order.combos.map((combo) => {
        return new Combo(
          combo.comboProducts.map(
            (comboProduct) =>
              new Product(
                comboProduct.product.id,
                comboProduct.product.name,
                new ProductCategory(comboProduct.product.category),
                comboProduct.product.price.toNumber(),
                comboProduct.product.description,
                comboProduct.product.images.map((image) => new ProductImage(image.url))
              )
          )
        )
      })
      const paymentStatus = order.statusPayment as PaymentStatus
      const orderStatus = order.status as OrderStatus

      return new Order(order.id, customer, combos, paymentStatus, orderStatus, order.createdAt)
    })
  }
}
