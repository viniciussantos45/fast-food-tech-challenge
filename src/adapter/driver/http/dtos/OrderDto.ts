import { Combo } from '@/core/domain/entities/Combo'
import { Customer } from '@/core/domain/entities/Customer'

export class OrderCreateDto {
  customer!: Customer
  combos!: Combo[]
}
