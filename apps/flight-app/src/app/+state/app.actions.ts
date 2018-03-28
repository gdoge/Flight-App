

export class IncreaseByAction {
  type = 'INCREASE_BY';
  constructor (readonly amount: number) { }
}

export type AppAction = IncreaseByAction;

