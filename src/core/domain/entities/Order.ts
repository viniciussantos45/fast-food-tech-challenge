import { OrderStatus } from '../value-objects/OrderStatus'
import { PaymentStatus } from '../value-objects/PaymentStatus'
import { Combo } from './Combo'
import { Customer } from './Customer'

export class Order {
  private id: number | null
  private customer: Customer
  private combos: Combo[]
  private statusPayment: PaymentStatus
  private orderStatus: OrderStatus
  private createdAt: Date

  constructor(
    id: number | null,
    customer: Customer,
    combos: Combo[],
    statusPayment: PaymentStatus,
    status: OrderStatus,
    createdAt: Date
  ) {
    this.id = id
    this.customer = customer
    this.combos = combos
    this.statusPayment = statusPayment
    this.orderStatus = status
    this.createdAt = createdAt
  }

  public getId(): number | null {
    return this.id
  }

  public getCustomer(): Customer {
    return this.customer
  }

  public getCombos(): Combo[] {
    return this.combos
  }

  public getStatusPayment(): PaymentStatus {
    return this.statusPayment
  }

  public getOrderStatus(): OrderStatus {
    return this.orderStatus
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public setCustomer(customer: Customer): void {
    this.customer = customer
  }

  public setCombos(combos: Combo[]): void {
    this.combos = combos
  }

  public setStatusPayment(statusPayment: PaymentStatus): void {
    this.statusPayment = statusPayment
  }

  public setOrderStatus(status: OrderStatus): void {
    this.orderStatus = status
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt
  }

  public addCombo(combo: Combo): void {
    this.combos.push(combo)
  }
}
