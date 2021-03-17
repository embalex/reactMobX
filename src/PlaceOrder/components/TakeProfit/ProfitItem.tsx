import React from 'react';
import block from 'bem-cn-lite';
import { Cancel } from '@material-ui/icons';
import { observer } from 'mobx-react';

import { NumberInput } from 'components';

import { IProfitItem } from './types';
import { QUOTE_CURRENCY } from '../../constants';

import './ProfitItem.scss';

const b = block('profit-item');

interface IProps extends IProfitItem {
  canDelete: boolean;
  onDelete: () => void;
}

export const ProfitItem: React.FC<IProps> = observer(({
  amountToSell,
  profit,
  targetPrice,
  canDelete,
  onDelete,
}) => (
  <div className={b('inputs')}>
    <NumberInput
      value={profit.value}
      onChange={profit.set}
      decimalScale={2}
      InputProps={{ endAdornment: '%' }}
      variant="underlined"
      onFocus={profit.settingStarted}
      onBlur={profit.settingCompleted}
    />
    <NumberInput
      value={targetPrice.value}
      onChange={targetPrice.set}
      decimalScale={2}
      InputProps={{ endAdornment: QUOTE_CURRENCY }}
      variant="underlined"
      onFocus={targetPrice.settingStarted}
      onBlur={targetPrice.settingCompleted}
    />
    <NumberInput
      value={amountToSell.value}
      decimalScale={2}
      InputProps={{ endAdornment: '%' }}
      variant="underlined"
      onChange={amountToSell.set}
      onFocus={amountToSell.settingStarted}
      onBlur={amountToSell.settingCompleted}
    />
    {canDelete && (
      <div className={b('cancel-icon')} onClick={onDelete}>
        <Cancel/>
      </div>
    )}
  </div>
));
