// ComboEvents.ts

import { Combo } from './Combo';

// Event: ComboCreated
export class ComboCreated {
  constructor(public readonly combo: Combo) {}
}

// Event: ComboUpdated
export class ComboUpdated {
  constructor(public readonly combo: Combo) {}
}