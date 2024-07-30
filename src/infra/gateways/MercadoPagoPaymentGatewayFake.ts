import { IPaymentGateway } from '@/core/domain/gateways/PaymentGatewayInterface'

export class MercadoPagoPaymentGatewayFake implements IPaymentGateway {
  async processPaymentQRcode(_data: {
    amount: number
    description: string
    payer: {
      email: string
    }
  }): Promise<{ gatewayId: string; base64: string; qrCode: string }> {
    return {
      gatewayId: '123',
      base64: '123',
      qrCode: '123'
    }
  }
}
