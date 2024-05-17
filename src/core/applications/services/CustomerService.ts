import { Customer } from '../../domain/entities/Customer'
import { CustomerRepository } from '../ports/CustomerRepository'

export class CustomerService {
  private customerRepository: CustomerRepository

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public registerCustomer(cpf: string, name: string, email: string): void {
    const customer = new Customer(cpf, name, email)
    this.customerRepository.createCustomer(customer)
  }

  public updateCustomer(cpf: string, name: string, email: string): void {
    const customer = this.customerRepository.getCustomerById(cpf)
    if (customer) {
      customer.setName(name)
      customer.setEmail(email)
      this.customerRepository.updateCustomer(customer)
    }
  }

  // Other methods for managing customers
}
