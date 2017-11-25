const Flak = require('flak');

class Tikk {

    constructor(fn, duration = 0) {

        this._emitter = new Flak();

        this.req = null;

        this.progress = 0;
        this.start = 0;
        this.currentTime = 0;
        this.elapsed = 0;

        this.tick = (timestamp = performance.now()) => {
            if (!this.start)
                this.start = timestamp;

            this.progress = timestamp - this.start;
            this.currentTime = timestamp;

            fn();

            this.req = requestAnimationFrame(this.tick);
            this.elapsed = this.currentTime - this.start;

            if (duration && this.elapsed >= duration)
                this.stop();

        };

    }

    /**
     * Play animation
     * @returns {Tikk}
     */
    play() {
        this._emitter.fire('play');
        this.tick();
        return this;
    }

    /**
     * Pause animation
     * @returns {Tikk}
     */
    pause() {
        this._emitter.fire('pause');
        cancelAnimationFrame(this.req);
        return this;
    }

    /**
     * Stop animation
     * @returns {Tikk}
     */
    stop() {
        cancelAnimationFrame(this.req);
        this._emitter.fire('stop', this.elapsed);
        return this;
    }

    /**
     * Add event
     * @param eventName {string} event name
     * @param callback {Function} callback
     * @returns {Tikk}
     */
    on(eventName, callback) {
        this._emitter.on.call(this._emitter, eventName, callback);
        return this;
    }
}

module.exports = Tikk;