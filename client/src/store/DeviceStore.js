import { makeAutoObservable } from "mobx";

export class DeviceStore {
  constructor() {
    this._devices = [];
    makeAutoObservable(this);
  }

  setDevice(device) {
    this._devices.push(device)
  }

  get Devices() {
    return this._devices;
  }
}