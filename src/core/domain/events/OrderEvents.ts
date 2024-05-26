// OrderEvents.ts

import { Order } from '../entities/Order'
import { OrderStatus } from '../value-objects/OrderStatus'
import { PaymentStatus } from '../value-objects/PaymentStatus'

// Event: OrderCreated
export class OrderCreated {
  constructor(public readonly order: Order) {}
}

// Event: OrderUpdated
export class OrderUpdated {
  private currentStatus: OrderStatus

  constructor(public readonly order: Order) {
    this.currentStatus = order.getOrderStatus()!
  }

  updateStatus() {
    if (this.currentStatus === OrderStatus.RECEIVED) {
      this.order.setOrderStatus(OrderStatus.IN_PROGRESS)
    } else if (this.currentStatus === OrderStatus.IN_PROGRESS) {
      this.order.setOrderStatus(OrderStatus.READY)
    } else if (this.currentStatus === OrderStatus.READY) {
      this.order.setOrderStatus(OrderStatus.FINISHED)
    } else {
      throw new Error(`Invalid order status: ${this.currentStatus}`)
    }
  }
}

// Event: OrderConfirmed
export class OrderConfirmed {
  private order: Order

  constructor(order: Order) {
    this.order = order
  }

  updateInitialStatus() {
    this.order.setStatusPayment(PaymentStatus.APPROVED)
    this.order.setOrderStatus(OrderStatus.RECEIVED)
  }
}
