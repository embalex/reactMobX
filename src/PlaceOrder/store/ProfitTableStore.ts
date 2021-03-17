import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
} from 'mobx';

import {
  InputFieldStatus,
  IWithProfit,
} from './types';
import { ProfitItemStore } from './ProfitItemStore';
import { InputFieldStore } from './InputFieldStore';
import { SwitchFieldStore } from './SwitchFieldStore';
import { validator } from './validators';

const INCREMENT_PROFIT_VALUE = 2;
const MAX_PROFITS = 5;

type TableItemsType = IWithProfit<ProfitItemStore>['items'];

export class ProfitTableStore implements IWithProfit<ProfitItemStore> {
  isWithProfit: true = true;
  items: TableItemsType = ([] as unknown) as TableItemsType;
  private reactionDispose: () => void = () => {};

  constructor(private activeOrderSide: SwitchFieldStore<'buy', 'sell'>, private price: InputFieldStore) {
    makeObservable(this, {
      canAdd: computed,
      canDelete: computed,
      items: observable,
      addItem: action.bound,
      deleteItem: action.bound,
      projected: computed,
      validate: action.bound,
      balanceProfitAmount: action.bound,
      updateReaction: action.bound,
    });

    reaction(() => this.items.length, this.updateReaction, { fireImmediately: true });

    this.items.push(new ProfitItemStore(0, 100, this.price));
  }

  get canAdd(): boolean {
    return this.items.length < MAX_PROFITS;
  }

  get canDelete(): boolean {
    return this.items.length > 1;
  }

  addItem() {
    if (!this.canAdd) {
      return;
    }

    const lastProfitValue = this.items[this.items.length - 1].profit;

    this.items.push(
      new ProfitItemStore(
        lastProfitValue.value + INCREMENT_PROFIT_VALUE,
        20,
        this.price,
      ),
    );
  };

  deleteItem(index: number) {
    if (!this.canDelete) {
      return;
    }

    this.items.splice(index, 1);
  }

  get projected(): number {
    const calcOneProfit = (targetPriceFieldValue: number, amountFieldValue: number,
      priceFieldValue: number): number => {
      return this.activeOrderSide.value === 'buy'
        ? amountFieldValue * (targetPriceFieldValue - priceFieldValue)
        : amountFieldValue * (priceFieldValue - targetPriceFieldValue);
    };

    return this.items.reduce((profits, { targetPrice, amountToSell }) => {
      return profits + calcOneProfit(targetPrice.value, amountToSell.value, this.price.value);
    }, 0);
  }

  validate() {
    const validators = [
      validator.profitMinValue,
      validator.profitShouldBeGreaterThenPrevious,
      validator.profitSum,
      validator.targetPriceMinValue,
    ];

    const errors = validators
      .map(validator => validator(this.items))
      .filter(Boolean);
    console.log(errors);
  }

  updateReaction() {
    this.reactionDispose();
    this.reactionDispose = reaction(
      () => this.items.map(({ amountToSell }) => amountToSell.field.status),
      this.balanceProfitAmount,
      { fireImmediately: true },
    );
  }

  balanceProfitAmount(amountToSellFieldTypes: InputFieldStatus[]) {
    const changedStatuses = amountToSellFieldTypes.filter(state => (state !== InputFieldStatus.Changing)).length;

    if (changedStatuses !== amountToSellFieldTypes.length) {
      return;
    }
    const sumOfAmountToSells = this.items.reduce(
      (sum, { amountToSell }) => (sum + amountToSell.value),
      0,
    );

    if (sumOfAmountToSells > 100) {
      const maxAmountToSell = this.items.reduce(
        (acc, { amountToSell }, index) =>
          amountToSell.value > acc.value
            ? {
              value: amountToSell.value,
              index,
            }
            : { ...acc },
        { value: 0, index: 0 },
      );

      const delta = sumOfAmountToSells - 100;
      const newValueOfMaxAmountToSell =
        maxAmountToSell.value - delta > 0
          ? maxAmountToSell.value - delta
          : 0;
      this.items[maxAmountToSell.index].amountToSell.set(
        newValueOfMaxAmountToSell,
        { withCompleted: true },
      );
      this.balanceProfitAmount(amountToSellFieldTypes);
    }
  }
}
