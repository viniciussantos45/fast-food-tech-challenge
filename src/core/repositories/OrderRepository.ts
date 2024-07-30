import { Order } from '../domain/entities/Order'
import { OrderStatus } from '../domain/value-objects/OrderStatus'

export interface IOrderRepository {
  saveOrder(order: Order): Promise<Order>
  addPaymentGatewayId(orderId: number, gatewayId: string): Promise<void>
  getOrderById(orderId: number): Promise<Order>
  removeOrder(orderId: number): Promise<void>
  listOrders(): Promise<Order[]>
  listOrdersFilteredAndSorted(filters: { status: OrderStatus }, sorted: Array<'createdAt'>): Promise<Order[]>
  listOrdersGroupedByStatus(): Promise<Record<OrderStatus, Order[]>>
  updateOrder(order: Order): Promise<Order>
}
