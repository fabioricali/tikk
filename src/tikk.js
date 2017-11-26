const Flak = require('flak');

class Tikk {

    constructor(fn, duration = 0) {

        Object.defineProperties(this, {
            emitter: {
                value: new Flak()
            },

            req: {
                writable: true,
                value: null
            },

            start: {
                writable: true,
                value: 0
            },

            elapsed: {
                writable: true,
                value: 0
            },

            currentTime: {
                writable: true,
                value: 0
            },

            state: {
                writable: true,
                value: null
            }
        });

        this.tick = () => {
            this.currentTime = this.state === 'pause'
                ? this.currentTime
                : performance.now();

            if (!this.start)
                this.start = this.currentTime;

            this.elapsed = this.currentTime - this.start;

            fn(this.elapsed / duration, this.elapsed);

            this.req = requestAnimationFrame(this.tick);

            if (duration && this.elapsed >= duration)
                this.stop();

        };

    }

    /**
     * Play animation
     * @returns {Tikk}
     */
    play() {
        this.emitter.fire('play');
        this.state = 'play';
        this.tick();
        return this;
    }

    /**
     * Pause animation
     * @returns {Tikk}
     */
    pause() {
        this.emitter.fire('pause');
        cancelAnimationFrame(this.req);
        this.state = 'pause';
        return this;
    }

    /**
     * Stop animation
     * @returns {Tikk}
     */
    stop() {
        cancelAnimationFrame(this.req);
        this.emitter.fire('stop', this.elapsed);
        this.state = 'stop';
        this.start = 0;
        this.elapsed = 0;
        return this;
    }

    /**
     * Returns state can be play, pause, stop
     * @returns {string}
     */
    getState() {
        return this.state;
    }

    /**
     * Add event
     * @param eventName {string} event name
     * @param callback {Function} callback
     * @returns {Tikk}
     */
    on(eventName, callback) {
        this.emitter.on.call(this.emitter, eventName, callback);
        return this;
    }

    /**
     * Suspends firing of the named event(s).
     * @param eventName {...string} multiple event names to suspend
     * @returns {Tikk}
     */
    suspendEvent(...eventName) {
        this.emitter.suspendEvent.call(this.emitter, eventName);
        return this;
    }

    /**
     * Resumes firing of the named event(s).
     * @param eventName {...string} multiple event names to resume.
     * @returns {Tikk}
     */
    resumeEvent(...eventName) {
        this.emitter.resumeEvent.call(this.emitter, eventName);
        return this;
    }

    /**
     * Suspends all events.
     * @returns {Tikk}
     */
    suspendEvents() {
        this.emitter.suspendEvents.call(this.emitter);
        return this;
    }

    /**
     * Resume all events.
     * @returns {Tikk}
     */
    resumeEvents() {
        this.emitter.resumeEvents.call(this.emitter);
        return this;
    }
}

module.exports = Tikk;