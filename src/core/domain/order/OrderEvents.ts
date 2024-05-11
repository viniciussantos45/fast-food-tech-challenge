// OrderEvents.ts

import { Order } from "./Order";

// Event: OrderCreated
export class OrderCreated {
  constructor(public readonly order: Order) {}
}

// Event: OrderUpdated
export class OrderUpdated {
  constructor(public readonly order: Order) {}
}

// Event: OrderConfirmed
export class OrderConfirmed {
  constructor(public readonly order: Order) {}
}