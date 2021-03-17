import React from 'react';
import { observer } from 'mobx-react';
import block from 'bem-cn-lite';
import { AddCircle } from '@material-ui/icons';

import { TextButton } from 'components';

import { IWithProfit } from './types';
import { ProfitItem } from './ProfitItem';
import { OrderSide } from '../../types';
import { QUOTE_CURRENCY } from '../../constants';

import './ProfitContent.scss';

const b = block('profit-content');

interface IProps extends Omit<IWithProfit, 'isWithProfit'> {
  orderSide: OrderSide;
}

export const ProfitContent: React.FC<IProps> = observer(
  ({ orderSide, items, canAdd, canDelete, addItem, deleteItem, projected }) => (
    <div className={b('content')}>
      <div className={b('titles')}>
        <span>Profit</span>
        <span>Target price</span>
        <span>Amount to {orderSide === 'buy'
          ? 'sell'
          : 'buy'}</span>
      </div>
      {items.map((item, index) => {
        const {
          profit,
          targetPrice,
          amountToSell,
        } = item;
        return (
          <ProfitItem
            key={`TakeProfitItem_${index}`}
            canDelete={canDelete}
            onDelete={() => deleteItem(index)}
            amountToSell={amountToSell}
            profit={profit}
            targetPrice={targetPrice}
          />
        );
      })}
      {canAdd && (
        <TextButton className={b('add-button')} onClick={addItem}>
          <AddCircle className={b('add-icon')}/>
          <span>Add profit target 2/5</span>
        </TextButton>
      )}
      <div className={b('projected-profit')}>
        <span className={b('projected-profit-title')}>Projected profit</span>
        <span className={b('projected-profit-value')}>
        <span>{projected}</span>
        <span className={b('projected-profit-currency')}>
          {QUOTE_CURRENCY}
        </span>
      </span>
      </div>
    </div>
  ),
);
