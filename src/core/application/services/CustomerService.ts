import { Customer } from '@/core/domain/entities/Customer'
import { CPF } from '@/core/domain/value-objects/CPF'
import { ICustomerRepository } from '../ports/CustomerRepository'

export class CustomerService {
  private customerRepository: ICustomerRepository

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository
  }

  public registerCustomer(cpfPlainText: string, name: string, email: string): void {
    const cpf = new CPF(cpfPlainText)
    const customer = new Customer(cpf, name, email)
    this.customerRepository.createCustomer(customer)
  }

  public async updateCustomer(cpf: string, name: string, email: string): Promise<void> {
    const customer = await this.customerRepository.getCustomerById(cpf)
    if (customer) {
      customer.setName(name)
      customer.setEmail(email)
      this.customerRepository.updateCustomer(customer)
    }
  }
}
