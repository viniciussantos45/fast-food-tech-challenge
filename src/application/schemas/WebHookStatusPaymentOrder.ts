export const webhookStatusPaymentOrderSchema = {
  description: 'Webhook para atualizar o status do pagamento de um pedido',
  tags: ['pedido'],
  body: {
    type: 'object',
    properties: {
      orderId: {
        type: 'string',
        description: 'ID do pedido'
      },
      status: {
        type: 'string',
        description: 'Status do pagamento',
        enum: ['APPROVED', 'REJECTED']
      }
    }
  }
}
