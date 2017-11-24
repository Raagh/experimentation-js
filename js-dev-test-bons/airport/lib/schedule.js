class Schedule {
    constructor(time) {
        this.startTime = time.setMinutes(time.getMinutes() - 10);
        this.endTime = time.setMinutes(time.getMinutes() + 10);
    }

    static getScheduleKey(time) {
        let hours = time.getHours();
        let minutes = time.getMinutes() - 10;
        return hours + ':' + minutes;
    }
}

module.exports = Schedule;