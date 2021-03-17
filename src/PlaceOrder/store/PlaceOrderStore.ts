import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';

import { Profit } from './types';
import { ProfitItemStore } from './ProfitItemStore';
import { ProfitTableStore } from './ProfitTableStore';
import { InputFieldStore } from './InputFieldStore';
import { SwitchFieldStore } from './SwitchFieldStore';

export class PlaceOrderStore {
  activeOrderSide = new SwitchFieldStore('buy', 'buy' as const, 'sell' as const);
  price = new InputFieldStore(0);
  amount = new InputFieldStore(0);
  profit: Profit<ProfitItemStore> = {
    isWithProfit: false,
  };

  constructor() {
    makeObservable(this, {
      activeOrderSide: observable,
      price: observable,
      amount: observable,
      profit: observable,
      total: computed,
      toggleIsTakeProfit: action.bound,
    });
  }

  get total(): number {
    return this.price.value * this.amount.value;
  }

  setTotal(total: number) {
    this.amount.set(this.price.value > 0
      ? total / this.price.value
      : 0, { withCompleted: true });
  }

  toggleIsTakeProfit() {
    if (this.profit.isWithProfit) {
      this.profit = {
        isWithProfit: false,
      };

      return;
    }

    this.profit = new ProfitTableStore(this.activeOrderSide, this.price);
  }
}
