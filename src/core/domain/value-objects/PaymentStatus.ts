export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REFUNDED = 'REFUNDED'
}

export const PaymentStatusMessage = {
  [PaymentStatus.PENDING]: 'Payment pending',
  [PaymentStatus.APPROVED]: 'Payment approved',
  [PaymentStatus.REJECTED]: 'Payment rejected',
  [PaymentStatus.REFUNDED]: 'Payment refunded'
}
