import React from 'react';
import { observer } from 'mobx-react';
import block from 'bem-cn-lite';

import {
  NumberInput,
  Button,
} from 'components';

import {
  BASE_CURRENCY,
  QUOTE_CURRENCY,
} from './constants';
import { useStore } from './context';
import { PlaceOrderTypeSwitch } from './components/PlaceOrderTypeSwitch/PlaceOrderTypeSwitch';
import { TakeProfit } from './components/TakeProfit';
import './PlaceOrderForm.scss';

const b = block('place-order-form');

export const PlaceOrderForm = observer(() => {
  const {
    activeOrderSide,
    price,
    total,
    amount,
    setTotal,
    profit,
    toggleIsTakeProfit,
  } = useStore();
  return (
    <form
      className={b()}
      onSubmit={(event) => {
        event.preventDefault();
        profit.isWithProfit && profit.validate();
      }}
    >
      <div className={b('header')}>
        Binance: {`${BASE_CURRENCY} / ${QUOTE_CURRENCY}`}
      </div>
      <div className={b('type-switch')}>
        <PlaceOrderTypeSwitch
          activeOrderSide={activeOrderSide.value}
          onChange={activeOrderSide.set}
        />
      </div>
      <div className={b('price')}>
        <NumberInput
          label="Price"
          value={price.value}
          onChange={(value) => price.set(Number(value))}
          InputProps={{ endAdornment: QUOTE_CURRENCY }}
          onFocus={price.settingStarted}
          onBlur={price.settingCompleted}
        />
      </div>
      <div className={b('amount')}>
        <NumberInput
          value={amount.value}
          label="Amount"
          onChange={(value) => amount.set(Number(value))}
          InputProps={{ endAdornment: BASE_CURRENCY }}
          onFocus={amount.settingStarted}
          onBlur={amount.settingCompleted}
        />
      </div>
      <div className={b('total')}>
        <NumberInput
          value={total}
          label="Total"
          onChange={(value) => setTotal(Number(value))}
          InputProps={{ endAdornment: QUOTE_CURRENCY }}
        />
      </div>
      <div className={b('take-profit')}>
        <TakeProfit
          orderSide={activeOrderSide.value}
          onToggleTakeProfit={toggleIsTakeProfit}
          profit={profit}
        />
      </div>
      <div className="submit">
        <Button
          color={activeOrderSide.value === 'buy'
            ? 'green'
            : 'red'}
          type="submit"
          fullWidth
        >
          {activeOrderSide.value === 'buy'
            ? `Buy ${BASE_CURRENCY}`
            : `Sell ${QUOTE_CURRENCY}`}
        </Button>
      </div>
    </form>
  );
});
