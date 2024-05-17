// src/domain/customer/CustomerEvents.ts

export class CustomerRegistered {
  constructor(public readonly customerId: string) {}

  eventName(): string {
    return 'CustomerRegistered'
  }
}

export class CustomerUpdated {
  constructor(public readonly customerId: string) {}

  eventName(): string {
    return 'CustomerUpdated'
  }
}
