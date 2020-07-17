export default class UserInfo {
    constructor(hand, wrist, gender, height, activityPerWeek, activeTime) {
        this._hand = hand;
        this._wrist = wrist;
        this._gender = gender;
        this._height = height;
        this._activityPerWeek = activityPerWeek;
        this._activeTime = activeTime;
    }
    get hand() {
        return this._hand;
    }
    get wrist() {
        return this._wrist;
    }
    get gender() {
        return this._gender;
    }
    get height() {
        return this._height;
    }
    get activityPerWeek() {
        return this._activityPerWeek;
    }
   get activeTime() {
        return this._activeTime;
    }
    set hand(h) {
        this._hand = h;
    }
    set wrist(w) {
        this._wrist = w;
    }
    set gender(g) {
        this._gender = g;
    }
    set height(he) {
        this._height = he;
    }
    set activityPerWeek(apw) {
      this._activityPerWeek = apw;
    }
    set activeTime(at) {
      this._activeTime = at;
    }
  
}

