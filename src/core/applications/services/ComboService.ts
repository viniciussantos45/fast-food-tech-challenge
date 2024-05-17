import { Combo } from '@/core/domain/entities/Combo'
import { ComboRepository } from '../ports/ComboRepository'

export class ComboService {
  constructor(private comboRepository: ComboRepository) {}

  async createCombo(combo: Combo): Promise<void> {
    await this.comboRepository.saveCombo(combo)
  }

  async getComboById(comboId: string): Promise<Combo | null> {
    return await this.comboRepository.getComboById(comboId)
  }

  async updateCombo(combo: Combo): Promise<void> {
    await this.comboRepository.updateCombo(combo)
  }

  async deleteCombo(comboId: string): Promise<void> {
    await this.comboRepository.deleteCombo(comboId)
  }
}
