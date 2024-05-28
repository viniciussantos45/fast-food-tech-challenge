export enum OrderStatus {
  RECEIVED = 'received',
  IN_PROGRESS = 'in_progress',
  READY = 'ready',
  FINISHED = 'finished'
}

export const OrderStatusMessage = {
  [OrderStatus.RECEIVED]: 'Order received',
  [OrderStatus.IN_PROGRESS]: 'Order in progress',
  [OrderStatus.READY]: 'Order ready',
  [OrderStatus.FINISHED]: 'Order finished'
}
