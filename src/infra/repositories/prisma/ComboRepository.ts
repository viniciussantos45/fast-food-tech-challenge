import { Combo } from '@/shared-kernel/entities/Combo'
import { IComboRepository } from '@/shared-kernel/repositories/ComboRepository'
import { PrismaClient } from '@prisma/client'

export class ComboRepository implements IComboRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async saveCombo(_combo: Combo): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getComboById(_comboId: number): Promise<Combo | null> {
    throw new Error('Method not implemented.')
  }
  updateCombo(_combo: Combo): Promise<void> {
    throw new Error('Method not implemented.')
  }
  deleteCombo(_comboId: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
