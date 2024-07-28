export const orderStatusPaymentSchema = {
  description: 'Retorna o status do pagamento de um pedido',
  tags: ['pedido'],
  params: {
    type: 'object',
    properties: {
      orderId: {
        type: 'string',
        description: 'ID do pedido'
      }
    }
  }
}
