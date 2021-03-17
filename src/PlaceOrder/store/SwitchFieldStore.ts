import {
  action,
  makeObservable,
  observable,
} from 'mobx';

export class SwitchFieldStore<ON, OFF> {
  value: ON | OFF;

  constructor(initializationValue: ON | OFF, private onValue: ON, private offValue: OFF) {
    makeObservable(this, {
      value: observable,
      set: action.bound,
      toggle: action.bound,
    });

    this.value = initializationValue;
  }

  set(value: ON | OFF) {
    this.value = value;
  }

  toggle() {
    if (this.value === this.onValue) {
      this.value = this.offValue;
    }
    else {
      this.value = this.onValue;
    }
  }
}
