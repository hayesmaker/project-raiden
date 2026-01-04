export default class Timer {
    constructor () {
        this.isRunning = false;
        this.startTime = 0;
        this.overallTime = 0;
        this.countdownTime = 0;
    }

    _getTimeElapsedSinceLastStart () {
        if (!this.startTime) {
            return 0;
        }
        return Date.now() - this.startTime;
    }

    setCountdownTime (mins = 1, seconds = 0) {
        const time = mins * 60000 + seconds * 1000;
        this.countdownTime = new Date(time);
    }

    start () {
        if (this.isRunning) {
            return console.error('Timer is already running');
        }
        this.isRunning = true;
        this.startTime = Date.now();
    }

    stop () {
        if (!this.isRunning) {
            return console.error('Timer is already stopped');
        }
        this.isRunning = false;
        this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    reset () {
        this.overallTime = 0;

        if (this.isRunning) {
            this.startTime = Date.now();
            return;
        }

        this.startTime = 0;
    }

    getCountdown() {
        if (!this.startTime || !this.countdownTime) {
            return 0;
        }

        if (this.isRunning) {
            return this.countdownTime - this.getTime();
        }
    }

    getTime () {
        if (!this.startTime) {
            return 0;
        }

        if (this.isRunning) {
            return this.overallTime + this._getTimeElapsedSinceLastStart();
        }

        return this.overallTime;
    }
}
