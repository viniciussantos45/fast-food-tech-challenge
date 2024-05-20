import { ICustomerRepository } from '@/core/application/ports/CustomerRepository'
import { Customer } from '@/core/domain/entities/Customer'
import { CPF } from '@/core/domain/value-objects/CPF'

export class CustomerRepositoryMemory implements ICustomerRepository {
  public customers: Customer[] = []

  public async createCustomer(customer: Customer): Promise<Customer | void> {
    const customerExists = this.customers.find((c) => c.getCpf() === customer.getCpf())

    if (customerExists) {
      return new Customer(new CPF(customerExists.getCpf()), customerExists.getName(), customerExists.getEmail())
    }

    this.customers.push(customer)
  }

  public async updateCustomer(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex((c) => c.getCpf() === customer.getCpf())
    this.customers[customerIndex] = customer
  }

  public async deleteCustomer(customerId: string): Promise<void> {
    this.customers = this.customers.filter((c) => c.getCpf() !== customerId)
  }

  public async getCustomerById(customerId: string): Promise<Customer | undefined> {
    return this.customers.find((c) => c.getCpf() === customerId)
  }

  public async getCustomers(): Promise<Customer[]> {
    return this.customers
  }
}
