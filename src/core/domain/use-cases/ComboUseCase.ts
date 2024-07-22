import { IComboRepository } from '../../repositories/ComboRepository'
import { Combo } from '../entities/Combo'
import { Product } from '../entities/Product'

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

  public async updateCombo(combo: Combo, products: Product[]): Promise<Combo> {
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
