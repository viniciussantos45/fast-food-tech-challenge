import { Combo } from '@/core/domain/entities/Combo'
import { IComboRepository } from '@/core/repositories/ComboRepository'
import { PrismaClient } from '@prisma/client'

export class ComboRepository implements IComboRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async saveCombo(combo: Combo): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getComboById(comboId: number): Promise<Combo | null> {
    throw new Error('Method not implemented.')
  }
  updateCombo(combo: Combo): Promise<void> {
    throw new Error('Method not implemented.')
  }
  deleteCombo(comboId: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
