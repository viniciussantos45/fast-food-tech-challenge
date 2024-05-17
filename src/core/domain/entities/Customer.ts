class Customer {
  private cpf: string
  private name: string
  private email: string

  constructor(cpf: string, name: string, email: string) {
    this.cpf = cpf
    this.name = name
    this.email = email
  }

  public getCpf(): string {
    return this.cpf
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
  }
}

export { Customer }
