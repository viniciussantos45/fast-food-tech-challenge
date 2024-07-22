import { Customer } from '@/core/domain/entities/Customer'
import { ICustomerRepository } from '@/core/repositories/CustomerRepository'

export class CustomerRepositoryMemory implements ICustomerRepository {
  public customers: Customer[] = []

  public async createCustomer(customer: Customer): Promise<Customer | void> {
    this.customers.push(customer)

    return customer
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

  public async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return this.customers.find((c) => c.getEmail() === email)
  }

  public async getCustomers(): Promise<Customer[]> {
    return this.customers
  }
}
