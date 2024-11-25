import { Combo } from '@/shared-kernel/entities/Combo'
import { Product } from '@/shared-kernel/entities/Product'
import { IComboRepository } from '../../../shared-kernel/repositories/ComboRepository'

export class ComboUseCase {
  private comboRepository: IComboRepository

  constructor(comboRepository: IComboRepository) {
    this.comboRepository = comboRepository
  }

  public async getComboById(id: number): Promise<Combo | null> {
    const combo = await this.comboRepository.getComboById(id)
    return combo
  }

  public async saveCombo(products: Product[]): Promise<Combo> {
    // Logic to create a combo with the given products
    const combo = new Combo(products)
    this.comboRepository.saveCombo(combo)
    return combo
  }

  public async updateCombo(combo: Combo, _products: Product[]): Promise<Combo> {
    // Logic to update the combo with the given products
    // combo.updateProducts(products)
    this.comboRepository.saveCombo(combo)
    return combo
  }

  public async deleteCombo(combo: Combo): Promise<void> {
    // Logic to delete the combo
    const comboId = combo.getId()
    if (comboId !== null) {
      this.comboRepository.deleteCombo(comboId)
    }
  }
}
