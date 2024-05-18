import { Customer } from '../../domain/entities/Customer'

export interface ICustomerRepository {
  createCustomer(customer: Customer): void
  updateCustomer(customer: Customer): void
  deleteCustomer(customerId: string): void
  getCustomerById(customerId: string): Promise<Customer | undefined>
  getCustomers(): Promise<Customer[]>
}
