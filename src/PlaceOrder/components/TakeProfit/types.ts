type InputField = {
  value: number;
  set: (value: number) => void;
  settingStarted: () => void;
  settingCompleted: () => void;
}

export interface IProfitItem {
  profit: InputField;
  targetPrice: InputField;
  amountToSell: InputField;
}

export interface IWithProfit {
  isWithProfit: true;
  canAdd: boolean;
  canDelete: boolean;
  addItem: () => void;
  deleteItem: (row: number) => void;
  items: IProfitItem[];
  validate: () => void;
  projected: number;
}

interface IWithoutProfit {
  isWithProfit: false;
}

export type Profit = IWithProfit | IWithoutProfit;
