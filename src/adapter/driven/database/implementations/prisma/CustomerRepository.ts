import { ICustomerRepository } from '@/core/application/ports/CustomerRepository'
import { Customer } from '@/core/domain/entities/Customer'
import { CPF } from '@/core/domain/value-objects/CPF'
import { PrismaClient } from '@prisma/client'

export class CustomerRepository implements ICustomerRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  public async createCustomer(customer: Customer): Promise<Customer | void> {
    await this.prisma.customer.create({
      data: {
        cpf: customer.getCpf(),
        name: customer.getName(),
        email: customer.getEmail()
      }
    })
  }

  public async updateCustomer(customer: Customer): Promise<void> {
    await this.prisma.customer.update({
      where: {
        cpf: customer.getCpf()
      },
      data: {
        name: customer.getName(),
        email: customer.getEmail()
      }
    })
  }

  public async deleteCustomer(customerId: string): Promise<void> {
    await this.prisma.customer.delete({
      where: {
        cpf: customerId
      }
    })
  }

  public async getCustomerById(customerId: string): Promise<Customer | undefined> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        cpf: customerId
      }
    })

    if (!customer) {
      return undefined
    }

    return new Customer(new CPF(customer.cpf), customer.name, customer.email)
  }

  public async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        email: email
      }
    })

    if (!customer) {
      return undefined
    }

    return new Customer(new CPF(customer.cpf), customer.name, customer.email)
  }

  public async getCustomers(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany()

    return customers.map((customer) => new Customer(new CPF(customer.cpf), customer.name, customer.email))
  }
}
