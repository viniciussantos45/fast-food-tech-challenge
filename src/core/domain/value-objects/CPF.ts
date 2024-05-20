export class CPF {
  private readonly value: string

  constructor(value: string) {
    if (!this.isValidCPF(value)) {
      throw new Error('Invalid CPF')
    }
    this.value = value
  }

  private isValidCPF(cpf: string): boolean {
    if (!cpf || cpf.length !== 11) {
      return false
    }

    let sum = 0
    let remainder

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false
    }

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    remainder = (sum * 10) % 11

    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }

    return remainder === parseInt(cpf.substring(10, 11))
  }

  public getValue(): string {
    return this.value
  }

  public equals(other: CPF): boolean {
    return this.value === other.getValue()
  }
}
