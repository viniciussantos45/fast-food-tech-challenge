// ComboEvents.ts

import { Combo } from '../entities/Combo'

// Event: ComboCreated
export class ComboCreated {
  constructor(public readonly combo: Combo) {}
}

// Event: ComboUpdated
export class ComboUpdated {
  constructor(public readonly combo: Combo) {}
}
