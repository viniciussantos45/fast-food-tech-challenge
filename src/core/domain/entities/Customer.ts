import { CPF } from '../value-objects/CPF'

export class Customer {
  private cpf?: CPF
  private name: string
  private email?: string

  constructor(cpf: CPF | undefined, name: string, email: string | undefined) {
    this.cpf = cpf
    this.name = name
    this.email = email
  }

  public getCpf(): string | undefined {
    return this.cpf?.getValue()
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string | undefined {
    return this.email
  }

  public setName(name: string): void {
    this.name = name
  }

  public setEmail(email: string): void {
    this.email = email
  }
}
