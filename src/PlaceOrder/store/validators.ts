import { ProfitTableStore } from './ProfitTableStore';

type Validator = (items: ProfitTableStore['items']) => string | undefined;

const MAX_PROFIT_SUM_VALUE = 500;
const profitSum: Validator = (items) => {
  const profitSum = items.reduce((sum, { profit }) => sum + profit.value, 0);

  if (profitSum > MAX_PROFIT_SUM_VALUE) {
    return 'Maximum profit sum is 500%';
  }
};

const MIN_PROFIT_VALUE = 0.01;
const profitMinValue: Validator = (items) => {
  const isLessThenMinValue = items.filter(({ profit }) => profit.value < MIN_PROFIT_VALUE).length > 0;

  if (isLessThenMinValue) {
    return 'Minimum value is 0.01';
  }
};

const profitShouldBeGreaterThenPrevious: Validator = (items) => {
  if (items.length === 1) {
    return;
  }

  const { isError } = items.reduce(
    ({ prevValue, isError }, { profit }) => ({
      prevValue: profit.value,
      isError: isError || prevValue >= profit.value,
    }), { prevValue: 0, isError: false });

  if (isError) {
    return 'Each target\'s profit should be greater than the previous one';
  }
};

const MIN_TARGET_PRICE_VALUE = 0.01;
const targetPriceMinValue: Validator = (items) => {
  const isLessThenMinValue = items.filter(({ targetPrice }) => targetPrice.value < MIN_TARGET_PRICE_VALUE).length > 0;

  if (isLessThenMinValue) {
    return 'Price must be greater than 0';
  }
};

export const validator = {
  profitSum,
  profitMinValue,
  profitShouldBeGreaterThenPrevious,
  targetPriceMinValue,
};
