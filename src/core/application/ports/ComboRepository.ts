import { Combo } from '../../domain/entities/Combo'

export interface IComboRepository {
  saveCombo(combo: Combo): Promise<void>
  getComboById(comboId: number): Promise<Combo | null>
  updateCombo(combo: Combo): Promise<void>
  deleteCombo(comboId: number): Promise<void>
}
