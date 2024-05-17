import { Customer } from '../../domain/entities/Customer'

export interface CustomerRepository {
  createCustomer(customer: Customer): void
  updateCustomer(customer: Customer): void
  deleteCustomer(customerId: string): void
  getCustomerById(customerId: string): Customer | undefined
  getCustomers(): Customer[]
}
