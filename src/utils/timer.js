export default class Timer {
    constructor () {
        this.isRunning = false;
        this.startTime = 0;
        this.overallTime = 0;
        this.countdownTime = 0;
        this.interval = null;
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
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.isRunning = false;
        this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    reset () {
        this.overallTime = 0;
        if (this.interval) {
            clearInterval(this.interval);
        }
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

    startCountdown(textField, callback) {
        // let timer = new Timer();
        this.setCountdownTime(MINS, SECS);
        this.start();

        function timeConversion(millis) {
            //var days = Math.floor(millisec / (1000 * 60 * 60 * 24));
            var hours = Math.max(0, Math.floor(millis / (1000 * 60 * 60)));
            var minutes = Math.max(0, Math.floor(millis / (1000 * 60) - hours * 60));
            var seconds = Math.max(0, Math.floor((millis / 1000) - minutes * 60));
            return {
                hours: pad(hours),
                minutes: pad(minutes),
                seconds: pad(seconds)
            }
        }

        this.interval = setInterval(() => {
            const millis = Math.round(timer.getCountdown());
            const countdown = timeConversion(millis);
            textField.text = countdown.hours + ":" + countdown.minutes + ":" + countdown.seconds;
            if (millis <= 0) {
                callback.call(this);
            }
        }, 100);
    }
}
