import { Customer } from '../../domain/customer/Customer'

export interface CustomerRepository {
  createCustomer(customer: Customer): void
  updateCustomer(customer: Customer): void
  deleteCustomer(customerId: string): void
  getCustomerById(customerId: string): Customer | undefined
  getCustomers(): Customer[]
}
