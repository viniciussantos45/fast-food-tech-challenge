import { PrismaClient } from '@prisma/client'

import { IComboRepository } from '@/core/application/ports/ComboRepository'
import { Combo } from '@/core/domain/entities/Combo'

export class ComboRepository implements IComboRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async saveCombo(combo: Combo): Promise<void> {
    // await this.prisma.combo.create({
    //   data: {
    //     id: combo.getId()
    //   }
    // })
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
