import { OrderStatus } from '../value-objects/OrderStatus'
import { PaymentStatus } from '../value-objects/PaymentStatus'
import { Combo } from './Combo'
import { Customer } from './Customer'

export class Order {
  private customer: Customer
  private combos: Combo[]
  private statusPayment: PaymentStatus
  private status: OrderStatus
  private createdAt: Date

  constructor(customer: Customer, combos: Combo[], statusPayment: PaymentStatus, status: OrderStatus, createdAt: Date) {
    this.customer = customer
    this.combos = combos
    this.statusPayment = statusPayment
    this.status = status
    this.createdAt = createdAt
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

  public getStatus(): OrderStatus {
    return this.status
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

  public setStatus(status: OrderStatus): void {
    this.status = status
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt
  }

  public addCombo(combo: Combo): void {
    this.combos.push(combo)
  }
}
