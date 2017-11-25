const Tikk = require('../src/tikk');

describe('tikk', function () {
    beforeEach(function() {
        global.performance = Date;
        global.requestAnimationFrame = fn => {
            return setImmediate(() => {
                fn();
            });
        };
        global.cancelAnimationFrame = id => {
            return clearImmediate(id);
        };
    });

    it('play', function (done) {
        const anim = new Tikk(()=>{
            console.log('test');
        }, 1800);

        anim.play();

        anim.on('stop', (elapsed)=>{
            console.log('stop', elapsed);
            done();
        });

    });
});