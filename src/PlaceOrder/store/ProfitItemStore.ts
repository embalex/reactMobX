import {
  action,
  makeObservable,
  observable,
  reaction,
} from 'mobx';

import {
  calcProfit,
  calcTargetPrice,
} from './utils';
import { InputFieldStore } from './InputFieldStore';
import { InputFieldStatus } from './types';

export class ProfitItemStore {
  profit: InputFieldStore = new InputFieldStore(0);
  targetPrice: InputFieldStore = new InputFieldStore(0);
  amountToSell: InputFieldStore = new InputFieldStore(0);

  constructor(newProfit: number, amount: number, private price: InputFieldStore) {
    makeObservable(this, {
      profit: observable,
      targetPrice: observable,
      amountToSell: observable,

      onPriceChanged: action.bound,
      onTargetPriceChanged: action.bound,
      onProfitChanged: action.bound,
    });
    this.profit.set(newProfit, { withCompleted: true });
    this.targetPrice.set(calcTargetPrice(this.price.value, this.profit.value), { withCompleted: true });
    this.amountToSell.set(amount, { withCompleted: true });

    reaction(() => this.price.field.status, this.onPriceChanged);
    reaction(() => this.targetPrice.field.status, this.onTargetPriceChanged);
    reaction(() => this.profit.field.status, this.onProfitChanged);
  }

  onPriceChanged(): void {
    if (this.price.field.status !== InputFieldStatus.Changed) {
      return;
    }

    this.targetPrice.set(calcTargetPrice(this.price.value, this.profit.value), { withCompleted: true });
  }

  onProfitChanged(): void {
    if (this.profit.field.status !== InputFieldStatus.Changed) {
      return;
    }

    this.targetPrice.set(calcTargetPrice(this.price.value, this.profit.value), { withCompleted: true });
  }

  onTargetPriceChanged(): void {
    if (this.targetPrice.field.status !== InputFieldStatus.Changed) {
      return;
    }

    this.profit.set(calcProfit(this.price.value, this.targetPrice.field.value));
  }
}
