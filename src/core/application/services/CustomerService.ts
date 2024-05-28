import { Customer } from '@/core/domain/entities/Customer'
import { CPF } from '@/core/domain/value-objects/CPF'
import { ICustomerRepository } from '../ports/CustomerRepository'

export class CustomerService {
  private customerRepository: ICustomerRepository

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository
  }

  public async registerCustomer(cpfPlainText: string, name: string, email: string): Promise<void> {
    const cpf = new CPF(cpfPlainText)

    const customerExists = await this.customerRepository.getCustomerById(cpfPlainText)

    if (customerExists) {
      throw new Error('Customer already exists')
    }

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

  public async loadCustomer(cpf: string): Promise<Customer | undefined> {
    const customer = await this.customerRepository.getCustomerById(cpf)
    return customer
  }

  public async identifyCustomer(cpf: string): Promise<
    | {
        cpf: string
        name: string
        email: string
      }
    | undefined
  > {
    const customer = await this.customerRepository.getCustomerById(cpf)

    if (!customer) {
      throw new Error('Customer not found')
    }

    return {
      cpf: customer.getCpf(),
      name: customer.getName(),
      email: customer.getEmail()
    }
  }
}
