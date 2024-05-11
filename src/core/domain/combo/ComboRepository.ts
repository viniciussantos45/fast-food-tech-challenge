import { Combo } from "./Combo";

export interface ComboRepository {
  saveCombo(combo: Combo): Promise<void>;
  getComboById(comboId: string): Promise<Combo | null>;
  updateCombo(combo: Combo): Promise<void>;
  deleteCombo(comboId: string): Promise<void>;
}