import { Combo } from '../../domain/entities/Combo'
import { Product } from '../../domain/entities/Product'
import { IComboRepository } from '../ports/ComboRepository'

export class ComboService {
  private comboRepository: IComboRepository

  constructor(comboRepository: IComboRepository) {
    this.comboRepository = comboRepository
  }

  public createCombo(products: Product[]): Combo {
    // Logic to create a combo with the given products
    const combo = new Combo(products)
    this.comboRepository.saveCombo(combo)
    return combo
  }

  public updateCombo(combo: Combo, products: Product[]): Combo {
    // Logic to update the combo with the given products
    // combo.updateProducts(products)
    this.comboRepository.saveCombo(combo)
    return combo
  }

  public deleteCombo(combo: Combo): void {
    // Logic to delete the combo
    this.comboRepository.deleteCombo(combo.getId())
  }
}
