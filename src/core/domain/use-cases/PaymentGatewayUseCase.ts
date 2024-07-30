import { IPaymentGateway } from '../gateways/PaymentGatewayInterface'

export class PaymentGatewayUseCase {
  private paymentGateway: IPaymentGateway

  constructor(paymentGateway: IPaymentGateway) {
    this.paymentGateway = paymentGateway
  }

  async processPaymentQRcode(data: {
    amount: number
    description: string
    payer: {
      email: string
    }
  }) {
    return this.paymentGateway.processPaymentQRcode(data)
  }
}
