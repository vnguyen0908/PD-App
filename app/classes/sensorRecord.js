export default class SensorRecord {
    constructor(hr, press, accel, gyro, orien) {
      this._hr = hr;
      this._press = press;
      this._accel = accel;    
      
    }
    get hr() {
        return this._hr;
    }
    get press() {
        return this._press;
    }
    get accel() {
        return this._accel;
    }
    set hr(h) {
        this._hr = h;
    }
    set press(p) {
        this._press = p;
    }
    set accel(a) {
        this._accel = a;
    }
}

