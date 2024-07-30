export interface IPaymentGateway {
  processPaymentQRcode(data: {
    amount: number
    description: string
    payer: {
      email: string
    }
  }): Promise<{ gatewayId: string; base64: string; qrCode: string }> | void
}
