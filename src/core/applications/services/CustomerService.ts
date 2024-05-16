import { Customer } from '@/core/domain/customer/Customer'
import { CustomerRepository } from '../ports/CustomerRepository'

export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  createCustomer(customer: Customer): void {
    this.customerRepository.createCustomer(customer)
  }

  updateCustomer(customer: Customer): void {
    this.customerRepository.updateCustomer(customer)
  }

  deleteCustomer(customerId: string): void {
    this.customerRepository.deleteCustomer(customerId)
  }

  getCustomerById(customerId: string): Customer | undefined {
    return this.customerRepository.getCustomerById(customerId)
  }

  getCustomers(): Customer[] {
    return this.customerRepository.getCustomers()
  }
}
