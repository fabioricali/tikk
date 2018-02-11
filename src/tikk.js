const Flak = require('flak');

if(typeof global !== 'undefined'){
    global.performance = Date;
    global.requestAnimationFrame = fn => {
        return setImmediate(() => {
            fn();
        });
    };
    global.cancelAnimationFrame = id => {
        return clearImmediate(id);
    };
}

/**
 * Tikk handler
 * @typedef {Function} Tikk~handler
 * @property {number} value - can be offset between 0 and 1 if duration is specified or delta (in ms) if no duration is specified. Usually 16 or 17
 * @property {number} elapsed - elapsed time
 */

/**
 * @class
 */
class Tikk {

    /**
     * Create instance
     * @param handler {Tikk~handler}
     * @param duration {number}
     */
    constructor(handler, duration = 0) {

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

            lastTime: {
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

            handler(duration
                ? this.elapsed / duration
                : this.currentTime - this.lastTime
                , this.elapsed);

            this.req = requestAnimationFrame(this.tick);

            this.lastTime = this.currentTime;

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
        this.emitter.fire('pause', this.elapsed);
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

    /**
     * Triggered at play
     * @event Tikk#play
     */

    /**
     * Triggered at pause
     * @event Tikk#pause
     * @param elapsed {number}
     */

    /**
     * Triggered at stop
     * @event Tikk#stop
     * @param elapsed {number}
     */
}

module.exports = Tikk;