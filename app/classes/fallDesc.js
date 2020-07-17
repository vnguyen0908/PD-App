
export default class FallDesc {
    constructor(type, direction) {
        this._type = type;
        this._direction = direction;
    }
    get type() {
        return this._type;
    }
    get direction() {
        return this._direction;
    }
    set type(t) {
        this._type = t;
    }
    set direction(d) {
        this._direction = d;
    }
}