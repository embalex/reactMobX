/* eslint @typescript-eslint/no-use-before-define: 0 */

import React from 'react';
import block from 'bem-cn-lite';
import { Collapse } from '@material-ui/core';
import { observer } from 'mobx-react';

import { Switch } from 'components';

import { OrderSide } from '../../types';
import { Profit } from './types';
import { ProfitContent } from './ProfitContent';

import './TakeProfit.scss';

type Props = {
  orderSide: OrderSide;
  onToggleTakeProfit: () => void;
  profit: Profit;
};

const b = block('take-profit');

export const TakeProfit = observer(({
  orderSide,
  profit,
  onToggleTakeProfit,
}: Props) => {
  const { isWithProfit } = profit;

  return (
    <div className={b()}>
      <div className={b('switch')}>
        <span>Take profit</span>
        <Switch checked={isWithProfit} onChange={onToggleTakeProfit}/>
      </div>
      <Collapse in={isWithProfit}>
        {profit.isWithProfit && (
          <ProfitContent
            orderSide={orderSide}
            canAdd={profit.canAdd}
            canDelete={profit.canDelete}
            deleteItem={profit.deleteItem}
            addItem={profit.addItem}
            items={profit.items}
            projected={profit.projected}
            validate={profit.validate}
          />
        )}
      </Collapse>
    </div>
  );
});
