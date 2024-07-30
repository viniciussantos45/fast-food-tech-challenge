import { IPaymentGateway } from '@/core/domain/gateways/PaymentGatewayInterface'

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export class MercadoPagoPaymentGateway implements IPaymentGateway {
  async processPaymentQRcode(data: { amount: number; description: string; payer: { email: string } }): Promise<{
    gatewayId: string
    base64: string
    qrCode: string
  }> {
    const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN
    const url = 'https://api.mercadopago.com/v1/payments'

    const body = {
      transaction_amount: data.amount,
      description: data.description,
      payment_method_id: 'pix',
      payer: {
        email: data.payer.email
      }
    }

    try {
      const { data } = await axios.post(url, body, {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'X-Idempotency-Key': uuidv4()
        }
      })

      return {
        gatewayId: data.id,
        base64: data.transaction_data.qr_code_base64,
        qrCode: data.transaction_data.qr_code
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating payment: ${error.message}`)
      } else {
        throw new Error('Error creating payment: Unknown error')
      }
    }
  }
}
