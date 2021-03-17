type Profits<IProfitStore> =
  | [IProfitStore]
  | [IProfitStore, IProfitStore]
  | [IProfitStore, IProfitStore, IProfitStore]
  | [IProfitStore, IProfitStore, IProfitStore, IProfitStore]
  | [IProfitStore, IProfitStore, IProfitStore, IProfitStore, IProfitStore];

export interface IWithProfit<IProfitStore> {
  isWithProfit: true;
  canAdd: boolean;
  canDelete: boolean;
  addItem: () => void;
  deleteItem: (index: number) => void;
  items: Profits<IProfitStore>;
  validate: () => void;
  projected: number;
}

export interface IWithoutProfit {
  isWithProfit: false;
}

export type Profit<IProfitStore> = IWithProfit<IProfitStore> | IWithoutProfit;

export enum InputFieldStatus {
  Initialized,
  Changing,
  Changed
}

type InputInitialized = {
  status: InputFieldStatus.Initialized;
  value: number;
};

type InputChanging = {
  status: InputFieldStatus.Changing;
  value: number;
};

type InputChanged = {
  status: InputFieldStatus.Changed;
  value: number;
};

export type InputField = InputInitialized | InputChanged | InputChanging;
