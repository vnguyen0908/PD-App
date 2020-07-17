

export default class Record {
    constructor( event, desc) {
        //this._time = time;
        this._event = event;
        this._desc = desc;
    }
    // get time() {
    //     return this._time;
    // }
    get event() {
        return this._event;
    }
    get desc() {
        return this._desc;
    }
    // set time(t) {
    //     this._time = t;
    // }
    set event(e) {
        this._event = e;
    }
    set desc(d) {
        this._desc = d;
    }
}
