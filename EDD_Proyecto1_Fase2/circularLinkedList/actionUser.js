class ActionUser {
    constructor(action, date, hour) {
        this.action = action;
        this.date = date;
        this.hour = hour;
    }

    setAction(action) {
        this.action = action;
    }

    setDate(date) {
        this.date = date;
    }

    setHour(hour) {
        this.hour = hour;
    }

    getAction() {
        return this.action;
    }

    getDate() {
        return this.date;
    }

    getHour() {
        return this.hour;
    }
}