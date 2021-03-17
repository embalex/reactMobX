import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';

import {
  InputField,
  InputFieldStatus,
} from './types';

export class InputFieldStore {
  field: InputField = {
    status: InputFieldStatus.Initialized,
    value: 0,
  };

  constructor(initializationValue: number) {
    makeObservable(this, {
      field: observable,
      settingStarted: action.bound,
      set: action.bound,
      value: computed,
      settingCompleted: action.bound,
    });

    this.field = {
      status: InputFieldStatus.Initialized,
      value: initializationValue,
    };
  }

  set(value: number, options?: { withCompleted: boolean }) {
    this.field = {
      status: InputFieldStatus.Changing,
      value: Number.isFinite(value)
        ? value
        : this.field.value,
    };

    if (options?.withCompleted) {
      this.settingCompleted();
    }
  }

  get value() {
    return this.field.value;
  }

  settingStarted() {
    this.field = {
      status: InputFieldStatus.Changing,
      value: this.field.value,
    };
  }

  settingCompleted() {
    this.field = {
      status: InputFieldStatus.Changed,
      value: this.field.value,
    };
  }
}
