import { Combo } from '@/core/domain/entities/Combo'
import { IComboRepository } from '@/core/repositories/ComboRepository'

export class ComboRepositoryMemory implements IComboRepository {
  private combos: Combo[] = []

  async getComboById(id: number): Promise<Combo | null> {
    return this.combos.find((combo) => combo.getId() === id) || null
  }

  async saveCombo(combo: Combo): Promise<void> {
    this.combos.push(combo)
  }

  async deleteCombo(id: number): Promise<void> {
    this.combos = this.combos.filter((combo) => combo.getId() !== id)
  }

  async updateCombo(combo: Combo): Promise<void> {
    const index = this.combos.findIndex((c) => c.getId() === combo.getId())
    if (index !== -1) {
      this.combos[index] = combo
    }
  }
}
