import { FastifyInstance } from 'fastify'
import { addProduct, editProduct, getProductsByCategory, removeProduct } from '../controllers/ProductController'
import { createProductSchema } from '../schemas/CreateProduct'
import { deleteProductSchema } from '../schemas/DeleteProduct'
import { editProductSchema } from '../schemas/EditProduct'

import { getProductsByCategorySchema } from '../schemas/ListProductsByCategory'

export const productRoutes = (fastify: FastifyInstance) => {
  // POST /product
  fastify.post(
    '/product',
    {
      schema: createProductSchema
    },
    addProduct
  )

  // PUT /product
  fastify.put(
    '/product/:id',
    {
      schema: editProductSchema
    },
    editProduct
  )

  // DELETE /product/:id
  fastify.delete(
    '/product/:id',
    {
      schema: deleteProductSchema
    },
    removeProduct
  )

  // GET /product/:category
  fastify.get(
    '/product/:category',
    {
      schema: getProductsByCategorySchema
    },
    getProductsByCategory
  )
}
